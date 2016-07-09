import 'whatwg-fetch';  // fetch polyfill

class Fetcher {
	fetch (url, opts){
		return fetch(url, opts)
	}
}

export default Fetcher