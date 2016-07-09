class NotificationActions {
	constructor() {
		this.generateActions (
			'addError',
			'remove'
		)
	}

	newError(errorMessage) {
		this.addError(errorMessage);
	}

	showed(id) {
		return (dispatch, alt) => {
			setTimeout(() => {
				this.remove(id);
			}, 4000)
		}
	}
}

export default NotificationActions