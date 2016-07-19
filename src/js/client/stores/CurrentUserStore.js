class CurrentUserStore {
	constructor() {
		this.init();

		this.bindActions(this.alt.getActions('CurrentUserActions'))
	}

	init() {
		this.user = null;

		this.error = null;
		this.edit = false;

		this.rooms = [];
	}

	onUpdateUsername(name) {
		if (this.user){
			this.user.name = name;
		}
	}

	onUserEdit() {
		this.edit = true;
	}

	onUserSave() {
		this.edit = false;
	}

	onUpdateUser(user) {
		this.user = user;
	}

	onUserFailed(error) {
		this.error = error;
		this.user = null;
	}

	onClearUser() {
		this.init();
	}
}

export default CurrentUserStore