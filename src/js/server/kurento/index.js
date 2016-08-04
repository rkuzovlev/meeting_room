import config from "config"
import request from "request"

const ckurento = config.get('kurento.service');
const kurl = "http://" + ckurento.host + ":" + ckurento.port;

export let newBroadcaster = function(broadcastID, userID, sdpOffer){
	return new Promise(function(resolve, reject){
		request({
			method: 'POST',
			url: kurl + `/broadcast/new/${broadcastID}/${userID}`,
			json: {sdpOffer: sdpOffer}
		},
		function (error, response, body) {
			if (error) {
				return reject(error)
			}

			console.log(body);

			resolve()
		})
	});
}