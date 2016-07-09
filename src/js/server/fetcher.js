import apiRoutes from "./apiRoutes"
import fetch from "node-fetch"
import url from "url"
import { getServerListenParams } from './utils'

class Fetcher {
	constructor(request){
		this._request = request
	}

	fetch (fetch_url, opts = {}){

		let u = url.parse(fetch_url);

		const sparams = getServerListenParams();

		let result_url = "";
		if (!u.hostname){
			result_url = "http://" + sparams.host + ":" + sparams.port + u.path
		} else {
			result_url = "http://" + u.hostname + ":" + u.port + u.path
		}

		opts.headers = opts.headers || {}
		opts.headers.cookie = this._request.headers.cookie;

		return fetch(result_url, opts);
	}
}


export default Fetcher