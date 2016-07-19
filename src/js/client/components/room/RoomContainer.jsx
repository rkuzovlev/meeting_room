import React from 'react'
import AltContainer from 'alt-container';

import Room from './Room.jsx';

export default React.createClass({
	render() {
		let stores = { 
			'RoomStore': this.props.flux.getStore('RoomStore')
		};

		let actions = {
			'RoomActions': this.props.flux.getActions('RoomActions')
		};

		actions.RoomActions.fetchRoom(this.props.params.roomID);

		return (
			<AltContainer stores={stores} actions={actions}>
				<Room />
			</AltContainer>
		)
	}
})