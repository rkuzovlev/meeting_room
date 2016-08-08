class RoomActions {
	constructor() {
		this.generateActions (
			'updateRoom',
			'roomFailed',
			'initRoom',
			'updateRoomPermissions',
			'localVideo'
		)
	}

	fetchRoom(id) {
		return (dispatch, alt) => {
			this.initRoom();

			let promise = alt.sources.RoomSource.fetch(id)
				.then((room) => {
					this.updateRoom(room);
				})
				.catch((error) => {
					console.error(error);
					this.roomFailed("Something wrong occurred");
				});

			alt.resolver.resolve(promise)
		}
	}

	checkPermissions(roomID){
		return (dispatch, alt) => {
			let promise = alt.sources.RoomSource.checkPermissions(roomID)
				.then((permissions) => {
					this.updateRoomPermissions(permissions);
				})
				.catch((error) => {
					console.error(error);
					this.roomFailed("Something wrong occurred on get room permissions");
				});

			alt.resolver.resolve(promise)
		}
	}

	loadRoom(roomID){
		return (dispatch, alt) => {
			alt.kurento.loadRoom(roomID);
		}
	}

	startStream(){
		return (dispatch, alt) => {
			if (alt.kurento.room){
				alt.kurento.room.startStream();
			} else {
				console.error('RoomActions.startStream cannot start stream, alt.kurento.room is ', alt.kurento.room);
			}
		}
	}

	stopStream(){
		return (dispatch, alt) => {
			if (alt.kurento.room){
				alt.kurento.room.stopStream();
			} else {
				console.error('RoomActions.stopStream cannot stop stream, alt.kurento.room is ', alt.kurento.room);
			}
		}
	}


	changeLocalVideo(video){
		return this.localVideo(video);
	}
}

export default RoomActions