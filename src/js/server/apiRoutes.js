import koaRouter from 'koa-router'

import * as uc from './controllers/user'

var router = koaRouter({
	prefix: '/api'
})

router.get('/user/:id', uc.getUser);

export default router