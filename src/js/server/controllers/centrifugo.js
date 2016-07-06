import { Token } from '../centrifugo'
import { getCurrentTimestamp } from '../utils'
import config from 'config'

const cconf = config.get('centrifugo')

export let createToken = function*(){
	this.status = 200;
	
	let user, info;

	if (this.session && this.session.passport && this.session.passport.user){
		user = this.session.passport.user.id.toString()
		info = JSON.stringify({
			"id": this.session.passport.user.id,
			"name": this.session.passport.user.name
		});
	} else {
		user = "";
		info = JSON.stringify({});
	}
	
	let ts = getCurrentTimestamp().toString()
	let token = Token.clientToken(user, ts, info);

	this.body = {
		user: user,
		timestamp: ts,
		info: info,
		token: token,
		url: cconf.clienturl
	}
}