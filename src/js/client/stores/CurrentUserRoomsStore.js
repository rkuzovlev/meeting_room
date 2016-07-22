class CurrentUserRoomsStore {
	constructor() {
		this.rooms = [];
		this.error = null;

		this.bindActions(this.alt.getActions('CurrentUserRoomsActions'))
	}

	onUpdateRooms(rooms) {
		this.rooms = rooms;
	}

	onUserFailed(error){
		this.error = error;
	}
}

export default CurrentUserRoomsStore