import * as utils from "../utils"

class RoomSource {
	constructor (fetcher) {
		this._fetcher = fetcher
	}

	fetch (id) {
		return this._fetcher.fetch('/api/room/' + id)
			.then(utils.checkResponseCode)
			.then(function(response) {
				return response.json()
			})
	}

	sendMessage(roomid, message) {
		let body = {
			"message": message
		};

		let opts = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin',
			body: JSON.stringify(body)
		};

		return this._fetcher.fetch('/api/room/' + roomid + "/message", opts)
			.then(utils.checkResponseCode);
	}

	checkPermissions(roomID){
		let opts = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin'
		};

		return this._fetcher.fetch("/api/room/" + roomID + "/stream/permissions", opts)
			.then(utils.checkResponseCode)
			.then(function(response){
				return response.json();
			});
	}

	// sendMessage(id, message) {
		
	// }
}

export default RoomSource