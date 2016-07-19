import React from 'react'
import AltContainer from 'alt-container';

import Profile from './Profile.jsx';

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

		actions.CurrentUserActions.fetchCurrentUser();
		actions.CurrentUserRoomsActions.fetchRooms();

		return (
			<AltContainer stores={stores} actions={actions}>
				<Profile />
			</AltContainer>
		)
	}
})