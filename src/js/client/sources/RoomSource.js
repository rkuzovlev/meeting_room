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

	// sendMessage(id, message) {
		
	// }
}

export default RoomSource