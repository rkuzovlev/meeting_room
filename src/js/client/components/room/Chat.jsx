import React from 'react'
import TextField from 'material-ui/TextField';

const writeInChatStyle = {
	bottom: 0
}

// <a target="blank" href="https://github.com/rkuzovlev/meeting_room">https://github.com/rkuzovlev/meeting_room</a>

export default React.createClass({
	componentWillMount() {
	      this.props.ChatActions.connectChat(this.props.roomid);
	      this.props.ChatActions.getHistory();
	},

	componentDidUpdate() {
		if (this.refs.messages){
			this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
		}
	},

	componentWillUnmount() {
	      this.props.ChatActions.disconnectChat(this.props.roomid);
	},

	onMessageKeyDown(event) {
		if (event.keyCode != 13){
			return
		}

		let msg = event.target.value;
		if (!msg.length){
			return
		}

		this.props.ChatActions.sendMessage(this.props.roomid, msg);
		event.target.value = '';
	},

	render() {
		// console.log('this.props', this.props);

		return (
			<div className="chat">
				<div className="buttons">
					
				</div>
				<div className="messages" ref="messages">
					{this.props.ChatStore.messages.map((message) => {
						let m = null;
						if (message.type == "chat"){	
							m = <p key={message.id} className="message">
								<span className="user">{message.from}:</span> {message.message}
							</p>
						} else if (message.type == "system"){	
							m = <p key={message.id} className="message system">
								{message.message}
							</p>
						} else if (message.type == "join"){	
							m = <p key={message.id} className="message system join">
								User <span>{message.message}</span> joined to the room
							</p>
						} else if (message.type == "leave"){	
							m = <p key={message.id} className="message system leave">
								User <span>{message.message}</span> left the room
							</p>
						}
						
						return m;
					})}
				</div>
				<div className="write">
					<TextField underlineStyle={ writeInChatStyle } onKeyDown={this.onMessageKeyDown} hintText="Write your message" fullWidth={true} /> 
				</div>
			</div>
		)
	}
})