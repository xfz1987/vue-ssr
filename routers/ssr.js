const router = require('koa-router')()

router.get('*', (ctx, next) => {
  ctx.body = 'hahah'
})

module.exports = router.routes()