class CurrentUserActions {
	constructor() {
		this.generateActions (
			'updateUsername',
			'updateUser',
			'userFailed'
		)
	}

	fetchCurrentUser() {
		return (dispatch, alt) => {
			dispatch();

			let promise = alt.sources.CurrentUserSource.fetchCurrent()
				.then((user) => {
					this.updateUser(user);
				})
				.catch((errorMessage) => {
					this.userFailed(errorMessage);
				});

			alt.resolver.resolve(promise)
		}
	}
}

export default CurrentUserActions