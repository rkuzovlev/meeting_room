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

	return fetch('/api/centrifugo/create_token', { credentials: 'same-origin' })
		.then(function(response){
			// console.log('response', response)
			return response.json()
		})
		.then(function(json){
			var c = new Centrifuge({
				url: json.url,
				user: json.user,
				timestamp: json.timestamp,
				token: json.token,
				info: json.info
			});

			c.subscribe("main", function(message) {
				console.log("main", message.data);
			});

			c.subscribe("user#1", function(message) {
				console.log("user#1", message.data);
			});

			// c.subscribe("room:1", function(message) {
			// 	console.log("room:1", message.data);
			// });

			c.connect();

			c.on('connect', function(context){
				// console.log('connect event', context);
			});

			cent = c;

			return c;
		})
}

export { getCentrifugo }