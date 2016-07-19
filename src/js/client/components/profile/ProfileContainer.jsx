import React from 'react'
import AltContainer from 'alt-container';

import Profile from './Profile.jsx';

export default React.createClass({
	render() {
		let stores = { 
			'CurrentUserStore': this.props.flux.getStore('CurrentUserStore')
		};

		let actions = {
			'CurrentUserActions': this.props.flux.getActions('CurrentUserActions')
		};

		actions.CurrentUserActions.fetchCurrentUser();

		return (
			<AltContainer stores={stores} actions={actions}>
				<Profile />
			</AltContainer>
		)
	}
})