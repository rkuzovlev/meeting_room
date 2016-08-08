import * as utils from "../utils"

class ChatActions {
	constructor() {
		this.subscription = null;

		this.generateActions (
			'newMessageFromServer',
			'chatFailed',
			'clearMessages',
			'systemMessage'
		)
	}

	sendMessage(roomid, message) {
		return (dispatch, alt) => {
			let promise = alt.sources.RoomSource.sendMessage(roomid, message)
				.catch((error) => {
					this.chatFailed("Can't send message");
				});

			alt.resolver.resolve(promise)
		}
	}

	getHistory(){
		return (dispatch, alt) => {
			if (this.subscription){
				this.subscription.history()
					.then((messages) => {
						// console.log('history', messages);
						messages.data.reverse().forEach((m) => {
							this._centMessage(m);
						})
					})
					.catch((err) => {
						console.error(err);
						this.chatFailed("Can't fetch chat history");
					});
			} else {
				console.warn("Can't get history");
			}
		}
	}

	recieveMessage(message, from, id = null, time = null, to = null){
		if (!id){
			id = utils.genUID();
		}

		if (!time){
			time = (new Date()).getTime();
		}

		return this.newMessageFromServer(message, from, id, time, to);
	}

	_centMessage(cm){
		// TODO: create to = cm.data.touser
		return this.recieveMessage(cm.data.message, cm.data.user, cm.uid, cm.timestamp, null);
	}

	clearChat(){
		return this.clearMessages();
	}

	connectChat(roomid){
		return (dispatch, alt) => {
			this.subscription = alt.centrifugo.subscribe('room:' + roomid);
			
			if (this.subscription){ // for server side rendering
				this.subscription.on('message', this._onMessage);
				this.subscription.on('join', this._onJoin);
				this.subscription.on('leave', this._onLeave);
				this.subscription.on('error', this._onError);
			}
		}
	}


	disconnectChat(roomid){
		return (dispatch, alt) => {
			if (this.subscription){
				this.subscription.off('message', this._onMessage);
				this.subscription.off('join', this._onJoin);
				this.subscription.off('leave', this._onLeave);
				this.subscription.off('error', this._onError);
				this.subscription.unsubscribe();
			}
		}
	}

	_onMessage (message) {
		// See below description of message format
		// console.log('message', message);
		return this._centMessage(message)
	}

	_onJoin (message) {
		// See below description of join message format
		// console.log('join', message);
		return this.systemMessage('join', message.data.default_info.name)
	}

	_onLeave (message) {
		// See below description of leave message format
		// console.log('leave', message);
		return this.systemMessage('leave', message.data.default_info.name)
	}

	_onError (errContext) {
		// See below description of subscribe error callback context format
		console.error('connectChat error', errContext);
	}
}

export default ChatActions