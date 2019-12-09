const router = require('koa-router')()

// load routes
const api = require('./api')
const ssr = require('./ssr')

router.use('/api', api)
router.use('/ssr', ssr)

router.get('/', async ctx => {
  const result = { name: 'xfz' }
  ctx.body = await ctx.render('test', result)
})

module.exports = router