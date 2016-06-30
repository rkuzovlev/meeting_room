import apiRoutes from "./apiRoutes"
import fetch from "node-fetch"
import url from "url"
import { getServerListenParams } from './utils'

class Fetcher {
	constructor(app){
		this._app = app
	}

	fetch (fetch_url){

		let u = url.parse(fetch_url);

		const sparams = getServerListenParams();

		let result_url = "";
		if (!u.hostname){
			result_url = "http://" + sparams.host + ":" + sparams.port + u.path
		} else {
			result_url = "http://" + u.hostname + ":" + u.port + u.path
		}

		return fetch(result_url);
	}
}


export default Fetcher