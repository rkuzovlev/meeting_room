import React from 'react'
import AltContainer from 'alt-container';

import Notifications from './Notifications.jsx';

export default React.createClass({
	render() {
		let stores = { 
			'NotificationStore': this.props.flux.getStore('NotificationStore')
		};

		let actions = {
			'NotificationActions': this.props.flux.getActions('NotificationActions')
		};

		return (
			<AltContainer stores={stores} actions={actions}>
				<Notifications />
			</AltContainer>
		)
	}
})