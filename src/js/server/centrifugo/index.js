import Client from "jscent"
import config from "config"
import { getCurrentTimestamp } from './../utils'

const cconf = config.get('centrifugo');

var c = new Client({
	url: cconf.url, 
	secret: cconf.secret
});

var t = c.config.token;

// setInterval(function(){
// 	let data = {
// 		message: 'test', 
// 		timestamp: getCurrentTimestamp()
// 	};

// 	c.publish('main', data, function(){
// 		console.log('data is published', arguments);
// 	});
// }, 10000);

export { c as Client, t as Token }