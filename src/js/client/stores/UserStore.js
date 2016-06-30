class UserStore {
	constructor() {
		this.user = {
			"id": null,
			"username": ""
		};
		this.errorMessage = null;

		this.fetched = false; // false if data is not fetched yet

		this.bindActions(this.alt.getActions('UserActions'))
	}

	onUpdateUsername(username) {
		this.user.username = username;
	}

	onUpdateUser(user) {
		this.user = user;
		this.fetched = true;
	}

	onUserFailed(errorMessage) {
		this.errorMessage = errorMessage;
		this.fetched = true;
	}
}

export default UserStore