import Client from "jscent"
import config from "config"
import redis from "redis"
import { getCurrentTimestamp } from './../utils'

const cconf = config.get('centrifugo');

var c = new Client({
	url: cconf.url, 
	secret: cconf.secret
});

var t = c.config.token;

var r = redis.createClient(cconf.redis);

export { c as Client, t as Token, r as Redis }