class CurrentUserActions {
	constructor() {
		this.generateActions (
			'updateUsername',
			'updateUser',
			'userFailed',
			'userEdit',
			'userSave',
			'updateRooms'
		)
	}

	fetchRooms() {
		return (dispatch, alt) => {
			dispatch();

			let promise = alt.sources.CurrentUserSource.fetchRooms()
				.then((rooms) => {
					this.updateRooms(rooms);
				})
				.catch((errorMessage) => {
					this.userFailed(errorMessage);
				});

			alt.resolver.resolve(promise)
		}
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

	edit() {
		return this.userEdit();		
	}

	save(user) {
		return (dispatch, alt) => {
			this.userSave(user);

			let NotificationActions = alt.getActions('NotificationActions')
			
			alt.sources.CurrentUserSource.saveUser(user).then(function(request){
				if (!request.ok){
					NotificationActions.newError("Can't save user, '" + request.statusText + "'");
				}
			}).catch((error) => {
				NotificationActions.newError(error.message);
			});
		}
	}
}

export default CurrentUserActions