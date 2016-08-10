class CentrifugoStore {
	constructor() {
		this.messages = [];

		this.bindActions(this.alt.getActions('CentrifugoActions'))
	}

	onNewMessage(message){
		this.messages.push(message);
	}
}

export default CentrifugoStore