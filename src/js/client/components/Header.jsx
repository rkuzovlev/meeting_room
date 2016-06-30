import React from 'react'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton';


export default React.createClass({
	getInitialState() {
		return this.props.flux.getStore('UserStore').getState();
	},

	componentDidMount() {
		this.props.flux.getStore('UserStore').listen(this.onChange);
	},

	componentWillMount() {
		let state = this.props.flux.getStore('UserStore').getState();
		this.setState(state);
		
		if (!state.fetched){
			this.props.flux.getActions('UserActions').fetchUser(12);
		}
	},

	componentWillUnmount() {
		this.props.flux.getStore('UserStore').unlisten(this.onChange);
	},

	onChange(state) {
		this.setState(state);
	},

	logout() {
		console.log('logout');
	},

	render() {
		const getList = () => {
			if (this.state.user.id){
				return (
					<ul>
						<li><Link tabIndex="-1" to="/"><FlatButton label="Home" /></Link></li>
						<li><Link tabIndex="-1" to="/about"><FlatButton label="About" /></Link></li>
						<li><Link tabIndex="-1" to="/profile"><FlatButton secondary={true} label={this.state.user.username} /></Link></li>
						<li><FlatButton label="Logout" onClick={this.logout} /></li>
					</ul>
				)
			} else {
				return (
					<ul>
						<li><Link tabIndex="-1" to="/"><FlatButton label="Home" /></Link></li>
						<li><Link tabIndex="-1" to="/about"><FlatButton label="About" /></Link></li>
						<li><Link tabIndex="-1" to="/login"><FlatButton secondary={true} label="Login/Sign up" /></Link></li>
					</ul>
				)
			}
		}

		return (
			<header>
				<span className="logo"><Link to="/" onlyActiveOnIndex>Meeting Room</Link></span>
				<nav>
					{getList()}
				</nav>
			</header>
		)
	}
})