import * as utils from "../utils"

class ChatStore {
	constructor() {
		this.messages = [];

		this.bindActions(this.alt.getActions('ChatActions'))
	}

	messageIsExistById(id){
		return this.messages.some(m => m.id == id);
	}

	onNewMessageFromServer([message, from, id, time, to]) {
		if (this.messageIsExistById(id)){
			return;
		}

		let msg = {
			type: 'chat',
			id: id,
			message: message,
			time: time,
			from: from.name,
			to: to
		};

		this.messages.push(msg);
		if (this.messages.length > 200){
			this.messages.shift()
		}
	}

	clearMessages(){
		this.messages = [];
	}

	onChatFailed(message){
		// let msg = {
		// 	type: 'system',
		// 	id: utils.genUID(),
		// 	message: message,
		// 	time: (new Date()).getTime()
		// };

		// this.messages.push(msg);
	}

	onSystemMessage([type, message]){
		let msg = {
			type: type,
			id: utils.genUID(),
			message: message,
			time: (new Date()).getTime()
		};

		// console.log('onSystemMessage', type, message, msg);
		this.messages.push(msg);
	}
}

export default ChatStore