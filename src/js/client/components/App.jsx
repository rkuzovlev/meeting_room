import React from 'react'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AltContainer from 'alt-container';

import Header from './Header.jsx';
import Notifications from './Notifications.jsx';


export default React.createClass({
	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme({}, {userAgent: 'all'})}>
				<AltContainer>
					<Notifications {...this.props} />
					<Header {...this.props} />

					{this.props.children}
				</AltContainer>
			</MuiThemeProvider>
		)
	}
})