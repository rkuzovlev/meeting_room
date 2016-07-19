class RoomStore {
	constructor() {
		this.error = null;
		this.room = null;

		this.bindActions(this.alt.getActions('RoomActions'))
	}

	onUpdateRoom(room) {
		this.room = room;
		this.error = null;
	}

	onRoomFailed(error) {
		this.error = error;
	}
}

export default RoomStore