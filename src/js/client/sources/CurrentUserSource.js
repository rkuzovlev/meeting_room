import isNode from 'detect-node'
import { getCentrifugo } from './../centrifugo'
import * as utils from "../utils"

if (!isNode){
	getCentrifugo().then(function(cent){
		console.log('cent', cent)
	})
}


class CurrentUserSource {
	constructor (fetcher) {
		this._fetcher = fetcher
	}

	logout () {
		return this._fetcher.fetch('/api/user/logout')
			.then(utils.checkResponseCode)
	}

	fetch (userId) {
		return this._fetcher.fetch('/api/user/' + userId)
			.then(utils.checkResponseCode)
			.then(function(response) {
				return response.json()
			})
	}

	fetchCurrent(){
		return this._fetcher.fetch('/api/user/current')
			.then(utils.checkResponseCode)
			.then(function(response) {
				return response.json()
			})
	}

	fetchRooms(){
		return this._fetcher.fetch('/api/user/current/rooms')
			.then(utils.checkResponseCode)
			.then(function(response) {
				return response.json()
			})
	}

	saveUser(user){
		let opts = {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin',
			body: JSON.stringify(user)
		};

		return this._fetcher.fetch('/api/user/current', opts).then(utils.checkResponseCode)
	}
};

export default CurrentUserSource