import React from 'react'
import AltContainer from 'alt-container';

import Room from './Room.jsx';

export default React.createClass({
	render() {
		let stores = { 
			'ChatStore': this.props.flux.getStore('ChatStore'),
			'CurrentUserStore': this.props.flux.getStore('CurrentUserStore'),
			'RoomStore': this.props.flux.getStore('RoomStore')
		};

		let actions = {
			'ChatActions': this.props.flux.getActions('ChatActions'),
			'CurrentUserActions': this.props.flux.getActions('CurrentUserActions'),
			'RoomActions': this.props.flux.getActions('RoomActions')
		};

		actions.RoomActions.fetchRoom(this.props.params.roomID);
		actions.RoomActions.checkPermissions(this.props.params.roomID);
		actions.RoomActions.loadRoom(this.props.params.roomID);
	    actions.ChatActions.clearChat();
	    // actions.ChatActions.connectChat(this.props.params.roomID);


		return (
			<AltContainer stores={stores} actions={actions}>
				<Room roomid={this.props.params.roomID} />
			</AltContainer>
		)
	}
})