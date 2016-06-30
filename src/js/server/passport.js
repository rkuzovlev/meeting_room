import passport from 'koa-passport'
import { Strategy as FBStrategy } from 'passport-facebook'
import koaRouter from 'koa-router'

import config from 'config'


const passportconf = config.get('passport')

const fbconf = passportconf.facebook
const fbStrategyConf = {
	"clientID": fbconf.clientID,
	"clientSecret": fbconf.clientSecret,
	"callbackURL": passportconf.server.host + fbconf.callbackURL
}

passport.use(new FBStrategy(fbStrategyConf, function(accessToken, refreshToken, profile, cb) {
	// In this example, the user's Facebook profile is supplied as the user
	// record.  In a production-quality application, the Facebook profile should
	// be associated with a user record in the application's database, which
	// allows for account linking and authentication with other identity
	// providers.
	
	// console.log("FBStrategy calllback", accessToken, refreshToken, profile, cb)
	console.log("FBStrategy calllback", this)

	return cb(null, profile);
}));


passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});




var router = koaRouter()

router.get(fbconf.loginURL, passport.authenticate('facebook'))
router.get(fbconf.callbackURL, function*(next) {
	var ctx = this

	yield* passport.authenticate('facebook', function*(err, user, info) {
		if (err) {
			console.log('error', err)
			ctx.status = 301
			ctx.redirect("/login/error/Can't login by facebook")
			return
		}

		if (user === false) {
			ctx.status = 301
			ctx.redirect("/login/error/Can't login by facebook")
		} else {
			ctx.status = 301
			ctx.redirect('/')
		}
	}).call(this, next)

})


export { passport, router }