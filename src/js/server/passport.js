import passport from 'koa-passport'
import { Strategy as FBStrategy } from 'passport-facebook'
import koaRouter from 'koa-router'

import config from 'config'
import sequelize from './sequelize'


const User   = sequelize.models.user;
const Social = sequelize.models.social;
const Room   = sequelize.models.room;


const passportconf = config.get('passport')

const fbconf = passportconf.facebook
const fbStrategyConf = {
	"clientID": fbconf.clientID,
	"clientSecret": fbconf.clientSecret,
	"callbackURL": passportconf.server.host + fbconf.callbackURL,
	"profileFields": fbconf.profileFields
}


let loginOrCreate = function (socialType, socialID, name, email, socialData){
	return Social.loginOrCreateUser(socialType, socialID, name, email, socialData);
}



/*
profile._json = { id: '***************',
				  first_name: 'ivan',
				  last_name: 'ivanov',
				  email: 'email@example.com' }
*/
passport.use(new FBStrategy(fbStrategyConf, function(accessToken, refreshToken, profile, cb) {
	let u = profile._json
	let name = u.first_name + " " + u.last_name;
	
	loginOrCreate('facebook', u.id, name, u.email, u).then(function(user){
		if (!user){
			throw new Error("Can't login with facebook");
		}

		console.log('logged', user.get({ plain: true }))

		cb(null, user.get({ plain: true }));
	}).catch(function(error){
		console.error("Can't login by facebook");
		cb(error, null);
	});
}));


passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});




var router = koaRouter()

router.get(fbconf.loginURL, passport.authenticate('facebook', { scope: fbconf.scope }))
router.get(fbconf.callbackURL, passport.authenticate('facebook', { successRedirect: '/', failureRedirect: "/login/error/Can't login by facebook" }));

// router.get(fbconf.callbackURL, function*(next) {
// 	var ctx = this

// 	yield* passport.authenticate('facebook', function*(err, user, info) {
// 		ctx.status = 301

// 		if (err) {
// 			console.log('error', err)
// 			ctx.redirect("/login/error/Can't login by facebook")
		
// 		} else if (user === false) {
// 			ctx.redirect("/login/error/Can't login by facebook")
		
// 		} else {
// 			ctx.redirect('/')
		
// 		}
// 	}).call(this, next)

// })


export { passport, router }