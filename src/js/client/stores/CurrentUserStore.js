class CurrentUserStore {
	constructor() {
		this.init();

		this.bindActions(this.alt.getActions('CurrentUserActions'))
	}

	initUser() {
		this.user = {
			avatar : "",
			email : "",
			id : null,
			name : ""
		};
	}

	init() {
		this.initUser();
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
		this.initUser();
	}

	onClearUser() {
		this.init();
	}
}

export default CurrentUserStore