const router = require('koa-router')()
const { env } = require('../config')

// load routes
const api = require('./api')
// const ssr = require('./ssr')
let ssrRouter = null

if (env === 'development') {
  ssrRouter = require('./dev-ssr')
} else {
  const staticRouter = require('./static')
  router.use(staticRouter)
  // ssrRouter = require('./ssr')
  ssrRouter = require('./ssr-no-bundle')
}

router.use('/api', api)
// router.use('/ssr', ssr)
router.use(ssrRouter)

module.exports = router