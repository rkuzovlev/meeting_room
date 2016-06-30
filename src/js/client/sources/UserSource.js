class UserSource {
	constructor (fetcher) {
		this._fetcher = fetcher
	}

	fetch (userId) {
		return this._fetcher.fetch('/api/user/' + userId)
			.then(function(response) {
				return response.json()
			})
	}
};

export default UserSource