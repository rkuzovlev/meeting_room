import {Redis as credis} from './index'

let send = function(method, channel, data){
	let reids_data = {
		"data": [
			{
				"method": method,
				"params": {
					"channel": channel, 
					"data": data
				}
			}
		]
	}
	
	return new Promise(function(resolve, reject){
		credis.rpush("centrifugo.api", JSON.stringify(reids_data), function(err){
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}


export let sendToRoom = function(roomID, data){
	return send('publish', "room:" + roomID, data)
}


export let sendToUser = function(userID, data){
	return send('publish', "user#" + userID, data)
}