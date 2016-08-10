import 'whatwg-fetch';  // fetch polyfill
import * as utils from '../utils';
import { getCentrifugo } from '../centrifugo'

class Messenger {
	constructor(roomID){
		this.roomID = roomID;
		this.binds = {};
		this._onUserChangeBind = this._onUserChange.bind(this);
		this._onMessageBind = this._onMessage.bind(this);
		this._prevUserID = null;
		this._userSub = null;

		flux.getStore('CurrentUserStore').listen(this._onUserChangeBind);
	}

	_unsubscribe(){
		if (this._userSub){
			this._userSub.off('message', this._onMessageBind);
			this._userSub.unsubscribe();
			this._userSub = null
		}
	}

	_onMessage(message){
		// console.log('Messenger.message', message);
		this.emit(message.data.type, message.data);
	}

	_onUserChange(state){
		let userID;
		if (state.user){
			userID = state.user.id;
		}

		if (this._prevUserID != userID){
			this._unsubscribe()
			
			if (userID){
				this._userSub = getCentrifugo().subscribe('user#' + userID);
				this._userSub.on('message', this._onMessageBind);
			}

			this._prevUserID = userID;
		}
	}

	sendMessage(message){
		let opts = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin',
			body: JSON.stringify(message)
		}

		return fetch(`/api/room/${this.roomID}/stream/message`, opts)
			.then(utils.checkResponseCode)
	}

	emit(type, message){
		if (this.binds[type]){
			for (let i in this.binds[type]){
				if (typeof this.binds[type][i].fn == 'function'){
					this.binds[type][i].fn.call(this.binds[type][i].ctx, message)
				}
			}
		}
	}

	on(type, fn, ctx = null){
		if (!this.binds[type]){
			this.binds[type] = []
		}

		this.binds[type].push({fn: fn, ctx: ctx});
	}

	off(type, fn){
		if (!this.binds[type]){
			return
		}

		let newArr = [];
		for (let i = 0; i < this.binds[type].length; i++){
			if (this.binds[type][i].fn != fn){
				newArr.push(this.binds[type][i]);
			}
		}

		this.binds[type] = newArr;
	}

	offAll(){
		this.binds = {};
	}

	destroy(){
		this.offAll();
		flux.getStore('CurrentUserStore').unlisten(this._onUserChangeBind);
		this._unsubscribe()
		this._onUserChangeBind = null;
		this._onMessageBind = null;
	}
}

export default Messenger