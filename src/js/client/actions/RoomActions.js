class RoomActions {
	constructor() {
		this.generateActions (
			'updateRoom',
			'roomFailed'
		)
	}

	fetchRoom(id) {
		return (dispatch, alt) => {
			dispatch();

			let promise = alt.sources.RoomSource.fetchRoom()
				.then((room) => {
					this.updateRoom(room);
				})
				.catch((errorMessage) => {
					this.roomFailed(errorMessage);
				});

			alt.resolver.resolve(promise)
		}
	}
}

export default RoomActions