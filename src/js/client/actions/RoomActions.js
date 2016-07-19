class RoomActions {
	constructor() {
		this.generateActions (
			'updateRoom',
			'roomFailed'
		)
	}

	fetchRoom(id) {
		return (dispatch, alt) => {
			this.updateRoom(null);

			let promise = alt.sources.RoomSource.fetch(id)
				.then((room) => {
					this.updateRoom(room);
				})
				.catch((error) => {
					this.roomFailed("Something wrong occurred");
				});

			alt.resolver.resolve(promise)
		}
	}
}

export default RoomActions