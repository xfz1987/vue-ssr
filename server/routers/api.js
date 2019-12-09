const router = require('koa-router')()
const apiController = require('../controller/api')

router.get('/getCity', apiController.getCity)
router.get('/getVersion', apiController.getVersion)

module.exports = router.routes()