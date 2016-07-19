class CurrentUserRoomsActions {
	constructor() {
		this.generateActions (
			'updateRooms'
		)
	}

	fetchRooms() {
		return (dispatch, alt) => {
			// dispatch();

			let promise = alt.sources.CurrentUserSource.fetchRooms()
				.then((rooms) => {
					this.updateRooms(rooms);
				})
				.catch((error) => {
					this.userFailed(error);
				});

			alt.resolver.resolve(promise)
		}
	}
}

export default CurrentUserRoomsActions