import React from 'react'
import { Link } from 'react-router'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

export default React.createClass({
	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme({}, {userAgent: 'all'})}>
				<div>
					<header>
						<span className="logo"><Link to="/" onlyActiveOnIndex>Meeting Room</Link></span>
						<nav>
							<ul>
								<li><Link tabIndex="-1" to="/"><FlatButton label="Home" /></Link></li>
								<li><Link tabIndex="-1" to="/about"><FlatButton label="About" /></Link></li>
								<li><Link tabIndex="-1" to="/about"><FlatButton secondary={true} label="Login/Sign up" /></Link></li>
							</ul>
						</nav>
					</header>
					
					{this.props.children}	
				</div>
			</MuiThemeProvider>
		)
	}
})