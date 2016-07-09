class CurrentUserStore {
	constructor() {
		this.user = {
			"id": null,
			"name": ""
		};
		this.errorMessage = null;
		this.edit = false;

		this.rooms = [];

		this.fetched = false; // false if data is not fetched yet

		this.bindActions(this.alt.getActions('CurrentUserActions'))
	}

	onUpdateRooms(rooms) {
		this.rooms = rooms;
	}

	onUpdateUsername(name) {
		this.user.name = name;
	}

	onUserEdit() {
		this.edit = true;
	}

	onUserSave() {
		this.edit = false;
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