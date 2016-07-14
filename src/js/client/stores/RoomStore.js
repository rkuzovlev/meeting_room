class RoomStore {
	constructor() {
		this.errorMessage = null;
		this.room = null;

		this.fetched = false; // false if data is not fetched yet

		this.bindActions(this.alt.getActions('RoomActions'))
	}

	onUpdateRoom(room) {
		this.room = room;
	}

	onRoomFailed(errorMessage){
		this.errorMessage = errorMessage;
	}
}

export default RoomStore