import 'whatwg-fetch';  // fetch polyfill

class Fetcher {
	fetch (url){
		return fetch(url)
	}
}

export default Fetcher