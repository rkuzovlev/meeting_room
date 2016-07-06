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
};

export default CurrentUserSource