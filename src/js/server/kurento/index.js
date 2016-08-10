import config from "config"
import request from "request"

const ckurento = config.get('kurento.service');
const kurl = "http://" + ckurento.host + ":" + ckurento.port;

export let message = function(user, roomid, message){
	return new Promise(function(resolve, reject){
		let j = null;
		if (user){
			j = user.toJSON();
		}
		// console.log(roomid, message);

		switch (message.type) {
			case "startStream": 
				if (!user){
					reject(new Error('Unauthorized'));
					return;
				}

				if (typeof message.sdpOffer != "string"){
					reject(new Error('sdpOffer is wrong "' + message.sdpOffer + '"'));
					return;
				}
				resolve(startStream(user, roomid, message.sdpOffer));
				return

			case "onIceCandidate": 
				if (!user){
					reject(new Error('Unauthorized'));
					return;
				}

				if (!message.candidate){
					reject(new Error('candidate is wrong "' + message.sdpOffer + '"'));
					return;
				}
				resolve(newCandidate(user, roomid, message.candidate));
				return

			default:
				reject(new Error('Unknown type ' + message.type));
		}
	});
}


function newCandidate(user, roomid, candidate){
	return new Promise(function(resolve, reject){
		let uid = user.get('id');

		request({
			method: 'POST',
			url: kurl + `/broadcast/candidate/${roomid}/${uid}`,
			json: {candidate: candidate}
		},
		function (error, response, body) {
			if (error) {
				return reject(error)
			}

			resolve()
		})
	});
}


function startStream(user, roomid, sdpOffer){
	return new Promise(function(resolve, reject){
		let uid = user.get('id');

		request({
			method: 'POST',
			url: kurl + `/broadcast/new/${roomid}/${uid}`,
			json: {sdpOffer: sdpOffer}
		},
		function (error, response, body) {
			if (error) {
				return reject(error)
			}

			resolve()
		})
	});
}