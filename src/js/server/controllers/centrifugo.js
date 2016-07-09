import { Token } from '../centrifugo'
import { getCurrentTimestamp } from '../utils'
import config from 'config'

const cconf = config.get('centrifugo')

export let createToken = function*(){
	this.status = 200;
	
	let userID, info;

	if (this.req.user){
		let user = this.req.user.toJSON()
		userID = user.id.toString()
		info = JSON.stringify({
			"id": user.id,
			"name": user.name
		});
	} else {
		userID = "";
		info = JSON.stringify({});
	}
	
	let ts = getCurrentTimestamp().toString()
	let token = Token.clientToken(userID, ts, info);

	this.body = {
		user: userID,
		timestamp: ts,
		info: info,
		token: token,
		url: cconf.clienturl
	}
}