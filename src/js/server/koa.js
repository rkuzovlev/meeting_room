import koa from 'koa'
import serve from 'koa-static'
import kcg from 'koa-conditional-get'
import etag from 'koa-etag'
import session from 'koa-session-redis'
import mount from 'koa-mount'

import routes from './routes'
import { getDistFolder } from './utils'

import Grant from 'grant-koa'

const grant_config = {
	"server": {
		"protocol": "http",
		"host": "meeting_room.com:3000"
	},
	"facebook": {
		"key": "1081764998555634",
		"secret": "c257c3d0f1d891874f6d4a7ef719c8a9",
		"callback": "/handle_facebook_callback",
		"scope": [
			"user_groups",
			"user_likes"
		]
	}
}

var grant = new Grant(grant_config)

var app = koa();

app.use(kcg())
app.use(etag())

app.keys = ['qp0GBwcn9VHdIQbVlF4MS2Tn']

app.use(serve(getDistFolder(), {gzip: true}));

app.use(session({
	store: {
		host: '127.0.0.1',
		port: 6370,
		ttl: 3600
	}
}));

app.use(mount(grant))

app.use(routes.routes());

app.listen(3000, function() {
	console.log('app is started');
});