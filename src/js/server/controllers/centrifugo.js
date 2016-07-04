import { Token } from '../centrifugo'
import { getCurrentTimestamp } from '../utils'
import config from 'config'

const cconf = config.get('centrifugo')

export let createToken = function*(){
	this.status = 200;
	
	let user = (12).toString();
	let ts = getCurrentTimestamp().toString()
	let info = JSON.stringify({
		"test": "qwe", 
		"f": true
	});

	let token = Token.clientToken(user, ts, info);

	this.body = {
		user: user,
		timestamp: ts,
		info: info,
		token: token,
		url: cconf.clienturl
	}
}