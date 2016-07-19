class NotificationActions {
	constructor() {
		this.generateActions (
			'addError',
			'remove'
		)
	}

	newError(error) {
		this.addError(error);
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