import isNode from 'detect-node'
import { getCentrifugo } from './../centrifugo'

if (!isNode){
	getCentrifugo().then(function(cent){
		console.log('cent', cent)
	})
}


class CurrentUserSource {
	constructor (fetcher) {
		this._fetcher = fetcher
	}

	fetch (userId) {
		return this._fetcher.fetch('/api/user/' + userId)
			.then(function(response) {
				return response.json()
			})
	}

	fetchCurrent(){
		return this._fetcher.fetch('/api/user/current')
			.then(function(response) {
				return response.json()
			})
	}

	fetchRooms(){
		return this._fetcher.fetch('/api/user/current/rooms')
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

		return this._fetcher.fetch('/api/user/current', opts)
	}
};

export default CurrentUserSource