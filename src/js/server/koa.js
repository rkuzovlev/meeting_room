import koa from 'koa'
import serve from 'koa-static'
import kcg from 'koa-conditional-get'
import etag from 'koa-etag'
import session from 'koa-generic-session'
import redisStore from 'koa-redis'
import config from 'config'
import bodyParser from 'koa-bodyparser'
import morgan from 'koa-morgan'

import { passport, router as passportRouter } from './passport'
import routes from './routes'
import apiRoutes from './apiRoutes'
import { getDistFolder, getServerListenParams } from './utils'

import './mysql'


var app = koa();

app.use(kcg())
app.use(etag())

app.keys = config.get("keys")

app.use(serve(getDistFolder(), { gzip: true }));

if (process.env.NODE_ENV != 'production'){
	app.use(morgan.middleware('dev'))
}

app.use(session({
	store: redisStore(config.get("redis"))
}));

app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(passportRouter.routes());
app.use(apiRoutes.routes());
app.use(routes.routes());

const serverConf = getServerListenParams()

app.listen(serverConf.port, serverConf.host, function() {
	console.log('app is started on ', serverConf.host + ":" + serverConf.port);
});