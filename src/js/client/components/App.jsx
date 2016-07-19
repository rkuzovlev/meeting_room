import React from 'react'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AltContainer from 'alt-container';

import HeaderContainer from './HeaderContainer.jsx';
import NotificationsContainer from './NotificationsContainer.jsx';


export default React.createClass({
	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme({}, {userAgent: 'all'})}>
				<AltContainer>
					<NotificationsContainer />
					<HeaderContainer />

					{this.props.children}
				</AltContainer>
			</MuiThemeProvider>
		)
	}
})