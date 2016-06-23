import koaRouter from 'koa-router'

import * as dc from './controllers/default'

var router = koaRouter()

router.get('/handle_facebook_callback', function* (next) {
  console.log(this.query)
  this.body = JSON.stringify(this.query, null, 2)
});

router.get('/*', dc.index);

export default router