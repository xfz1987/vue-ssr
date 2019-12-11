/**
 * 生产环境路由处理
 */
const router = require('koa-router')()
const VueServerRenderer = require('vue-server-renderer')
const { join } = require('path')
const fs = require('fs')
const serverRender = require('../common/server-render')
const clientManifest = require('../../public/vue-ssr-client-manifest.json')

const renderer = VueServerRenderer.createBundleRenderer(
	join(__dirname, '../../ssr-build/vue-ssr-server-bundle.json'),
	{
		inject: false,
		clientManifest
	}
)

//读取ejs模板
const template = fs.readFileSync(join(__dirname, '../views/server.ejs'), 'utf-8')

router.get('*', async (ctx, next) => {
  await serverRender(ctx, renderer, template)
})

module.exports = router.routes()