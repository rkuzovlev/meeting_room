class RoomActions {
	constructor() {
		this.generateActions (
			'updateRoom',
			'roomFailed',
			'initRoom'
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
}

export default RoomActions