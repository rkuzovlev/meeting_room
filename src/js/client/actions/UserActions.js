class UserActions {
	constructor() {
		this.generateActions (
			'updateUsername',
			'updateUser',
			'userFailed'
		)
	}

	fetchUser(userId) {
		return (dispatch, alt) => {
			dispatch();

			let promise = alt.sources.UserSource.fetch(userId)
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

export default UserActions