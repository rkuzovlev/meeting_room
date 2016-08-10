class CentrifugoActions {
	constructor() {
		this.generateActions (
			'newMessage'
		)

		this.subs = {};
	}

	addMessage(message) {
		return this.newMessage(message);
	}

	subscribe(channel){
		return (dispatch, alt) => {
			if (this.subs[channel]){
				return;
			}

			// this.subs[channel] = alt.centrifugo.
		}
	}

	unsubscribe(channel){
		
	}
}

export default CentrifugoActions