import Centrifuge from "centrifuge"
import { Promise } from "es6-promise"
import "whatwg-fetch"

var cent = null;

function getCentrifugo(){
	if (cent) {
		return new Promise(function(resolve){
			resolve(cent);
		});
	}

	return fetch('/api/centrifugo/create_token')
		.then(function(response){
			// console.log('response', response)
			return response.json()
		})
		.then(function(json){
			var c = new Centrifuge({
				url: json.url,
				// url: 'http://12d.rkuzovlev.com/connection',
				user: json.user,
				timestamp: json.timestamp,
				token: json.token,
				info: json.info
			});

			c.subscribe("main", function(message) {
				console.log(message);
			});

			c.connect();

			c.on('connect', function(context){
				console.log('connect event', context);
			});

			cent = c;

			return c;
		})
}

export { getCentrifugo }