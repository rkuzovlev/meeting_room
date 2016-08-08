import 'whatwg-fetch';  // fetch polyfill
import * as utils from '../utils';

class Messenger {
	constructor(roomID){
		this.roomID = roomID;
		this.binds = {};
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

	on(type, fn){
		if (!this.binds[type]){
			this.binds[type] = []
		}

		this.binds[type].push(fn);
	}

	off(type, fn){
		if (!this.binds[type]){
			return
		}

		let newArr = [];
		for (let i = 0; i < this.binds[type].length; i++){
			if (this.binds[type][i] != fn){
				newArr.push(this.binds[type][i]);
			}
		}

		this.binds[type] = newArr;
	}

	offAll(){
		this.binds = {};
	}
}

export default Messenger