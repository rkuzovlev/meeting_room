import 'whatwg-fetch';  // fetch polyfill

class Fetcher {
	fetch (url, opts){
		opts = opts || {}
		opts.credentials = 'same-origin'

		return fetch(url, opts)
	}
}

export default Fetcher