import koaRouter from 'koa-router'

import * as uc from './controllers/user'
import * as cc from './controllers/centrifugo'
import * as rc from './controllers/room'

var router = koaRouter({
	prefix: '/api'
})

router.get('/user/:id', uc.getUser);

router.get('/user/current', uc.getCurrentUser);
router.put('/user/current', uc.putCurrentUser);
router.get('/user/current/rooms', uc.getCurrentUserRooms);


router.post('/room/:roomid/stream/message', rc.streamMessage);
router.get('/room/:roomid/stream/permissions', rc.streamPermissions);
router.post('/room/:roomid/message', rc.newMessage);
router.get('/room/:roomid', rc.getRoom);


router.get('/centrifugo/create_token', cc.createToken);

export default router