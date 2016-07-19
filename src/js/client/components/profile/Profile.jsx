import React from 'react'
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AltContainer from 'alt-container';

import RoomListContainer from './RoomListContainer.jsx';

export default React.createClass({
	editUser() {
		this.props.CurrentUserActions.edit()
	},

	saveUser() {
		let user = this.props.CurrentUserStore.user;
		this.props.CurrentUserActions.save(user);
	},

	onChangeName(event) {
		// let state = this.props.CurrentUserStore;
		// state.user.name = event.target.value
		// this.setState(state);
	},

	onNameKeyDown(event) {
		if (event.keyCode == 13){
			this.saveUser();
		}
	},

	render() {
		let user = this.props.CurrentUserStore.user;

		if (this.props.CurrentUserStore.error){
			return (
				<section className="profile">
					<div className="error">
						{this.props.CurrentUserStore.error.message}
					</div>
				</section>
			)
		}
	
		if (!user){
			return (
				<section className="profile">
					Loading
				</section>
			)
		}

		let infoBlock = null;

		if (this.props.CurrentUserStore.edit){
			infoBlock = <div className="info">
				<div className="name"><TextField ref="nameInput" hintText="Username" onKeyDown={this.onNameKeyDown} onChange={this.onChangeName} value={user.name} /></div>
				<RaisedButton label="Save" onClick={this.saveUser} />
			</div>
		} else {
			infoBlock = <div className="info">
				<div className="name">{user.name}</div>
				<RaisedButton label="Edit" onClick={this.editUser} />
			</div>
		}


		return (
			<section className="profile">
				<div className="profile">
					<Avatar src={user.avatar} size={150} />
					{infoBlock}
				</div>

				<AltContainer>
					<RoomListContainer />
				</AltContainer>
			</section>
		)
	}
})


