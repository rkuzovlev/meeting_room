class CurrentUserRoomsStore {
	constructor() {
		this.rooms = [];

		this.bindActions(this.alt.getActions('CurrentUserRoomsActions'))
	}

	onUpdateRooms(rooms) {
		this.rooms = rooms;
	}
}

export default CurrentUserRoomsStore