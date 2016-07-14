import React from 'react'
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AltContainer from 'alt-container';

import RoomList from './RoomList.jsx';

export default React.createClass({
	getInitialState() {
		return this.props.flux.getStore('CurrentUserStore').getState();
	},

	componentDidMount() {
		this.props.flux.getStore('CurrentUserStore').listen(this.onChange);
	},

	componentWillMount() {
		let state = this.props.flux.getStore('CurrentUserStore').getState();
		this.setState(state);
		
		if (!state.fetched){
			this.props.flux.getActions('CurrentUserActions').fetchCurrentUser();
		}
	},

	componentWillUnmount() {
		this.props.flux.getStore('CurrentUserStore').unlisten(this.onChange);
	},

	onChange(state) {
		this.setState(state);
	},

	editUser() {
		this.props.flux.getActions('CurrentUserActions').edit()
	},

	saveUser() {
		let user = this.props.flux.getStore('CurrentUserStore').getState().user;
		this.props.flux.getActions('CurrentUserActions').save(user);
	},

	onChangeName(event) {
		let state = this.props.flux.getStore('CurrentUserStore').getState();
		state.user.name = event.target.value
		this.setState(state);
	},

	onNameKeyDown(event) {
		if (event.keyCode == 13){
			this.saveUser();
		}
	},

	render() {
		let infoBlock = null;
		if (this.state.edit){
			infoBlock = <div className="info">
				<div className="name"><TextField ref="nameInput" hintText="Username" onKeyDown={this.onNameKeyDown} onChange={this.onChangeName} value={this.state.user.name} /></div>
				<RaisedButton label="Save" onClick={this.saveUser} />
			</div>
		} else {
			infoBlock = <div className="info">
				<div className="name">{this.state.user.name}</div>
				<RaisedButton label="Edit" onClick={this.editUser} />
			</div>
		}

		return (
			<section className="profile">
				<div className="profile">
					<Avatar src={this.state.user.avatar} size={150} />
					{infoBlock}
				</div>

				<AltContainer>
					<RoomList />
				</AltContainer>
			</section>
		)
	}
})