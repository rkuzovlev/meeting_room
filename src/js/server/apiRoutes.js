import koaRouter from 'koa-router'

import * as uc from './controllers/user'
import * as cc from './controllers/centrifugo'

var router = koaRouter({
	prefix: '/api'
})

router.get('/user/:id', uc.getUser);

router.get('/user/current', uc.getCurrentUser);
router.put('/user/current', uc.putCurrentUser);
router.get('/user/current/rooms', uc.getCurrentUserRooms);


router.get('/centrifugo/create_token', cc.createToken);

export default router