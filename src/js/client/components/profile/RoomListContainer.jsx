import React from 'react'
import AltContainer from 'alt-container';

import RoomList from './RoomList.jsx';

export default React.createClass({
	render() {
		let stores = { 
			'CurrentUserRoomsStore': this.props.flux.getStore('CurrentUserRoomsStore'),
			'CurrentUserStore': this.props.flux.getStore('CurrentUserStore')
		};

		let actions = {
			'CurrentUserRoomsActions': this.props.flux.getActions('CurrentUserRoomsActions'),
			'CurrentUserActions': this.props.flux.getActions('CurrentUserActions')
		};

		actions.CurrentUserRoomsActions.fetchRooms();

		return (
			<AltContainer stores={stores} actions={actions}>
				<RoomList />
			</AltContainer>
		)
	}
})


