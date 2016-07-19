import React from 'react'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton';


export default React.createClass({
	logout() {
		console.log('logout');
	},

	render() {
		let user = this.props.CurrentUserStore.user;
		let getList = null;

		if (user){
			getList = <ul>
				<li><Link tabIndex="-1" to="/about"><FlatButton label="About" /></Link></li>
				<li><Link tabIndex="-1" to="/profile"><FlatButton secondary={true} label={user.name} /></Link></li>
				<li><FlatButton label="Logout" onClick={this.logout} /></li>
			</ul>
		} else {
			getList = <ul>
				<li><Link tabIndex="-1" to="/about"><FlatButton label="About" /></Link></li>
				<li><Link tabIndex="-1" to="/login"><FlatButton secondary={true} label="Login/Sign up" /></Link></li>
			</ul>
		}

		return (
			<header>
				<span className="logo"><Link to="/" onlyActiveOnIndex>Meeting Room</Link></span>
				<nav>
					{getList}
				</nav>
			</header>
		)
	}
})