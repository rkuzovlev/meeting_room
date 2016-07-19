import React from 'react'
import TextField from 'material-ui/TextField';

const writeInChatStyle = {
	bottom: 0
}


export default React.createClass({
	render() {
		// console.log('this.props', this.props);

		let room = this.props.RoomStore.room;
		let roomContent = null

		if (this.props.RoomStore.error) {
			roomContent = <div className="error">
				{this.props.RoomStore.error}
			</div>
		} else if (room) {
			roomContent = <div className="media">
				<div className="player">
					<h1>{room.title}</h1>
					<div className="video">
						<video></video>
					</div>
				</div>
				<div className="chat">
					<div className="buttons">
						
					</div>
					<div className="messages">
						<p className="message">
							<span className="user">Nixel:</span> Hello guys, try this link please <a target="blank" href="https://github.com/rkuzovlev/meeting_room">https://github.com/rkuzovlev/meeting_room</a>
						</p>
					</div>
					<div className="write">
						<TextField underlineStyle={ writeInChatStyle } hintText="Write your message" fullWidth={true} /> 
  					</div>
				</div>
			</div>
		} else {
			roomContent = <div className="loading">
				Room is loading
			</div>
		}
	

		return (
			<section className="room">
				{roomContent}
			</section>
		)
	}
})