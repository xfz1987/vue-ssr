const router = require('koa-router')()
const { env } = require('../config')

// load routes
const api = require('./api')
// const ssr = require('./ssr')
let ssrRouter = null

if (env === 'development') {
  ssrRouter = require('./dev-ssr')
} else {
  
}


router.use('/api', api)
// router.use('/ssr', ssr)
router.use(ssrRouter)

module.exports = router