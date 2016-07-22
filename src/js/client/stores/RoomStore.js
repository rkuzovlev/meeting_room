class RoomStore {
	constructor() {
		this.error = null;
		this._initRoom();

		this.bindActions(this.alt.getActions('RoomActions'))
	}

	_initRoom(){
		this.room = {
			description: "",
			id: 0,
			image: "",
			title: "",
			user_id: 0
		}
	}

	onInitRoom(){
		this._initRoom();
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