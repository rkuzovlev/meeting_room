class CurrentUserStore {
	constructor() {
		this.user = {
			"id": null,
			"name": ""
		};
		this.errorMessage = null;

		this.fetched = false; // false if data is not fetched yet

		this.bindActions(this.alt.getActions('CurrentUserActions'))
	}

	onUpdateUsername(name) {
		this.user.name = name;
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

export default CurrentUserStore