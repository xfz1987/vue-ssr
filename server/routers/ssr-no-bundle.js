/**
 * 生产环境路由处理
 * 非JSON方式
 * 优点: 性能优化了，renderer.renderToString
 * 缺点: 开发环不建议使用，因为无法写入到内存中，只能写到硬盘中
 * 方案: 开发环境使用 bundle.json，生产环境使用 server-entry.js
 */
const router = require('koa-router')()
const VueServerRenderer = require('vue-server-renderer')
const { join } = require('path')
const fs = require('fs')
const serverRender = require('../common/server-render-no-bundle')
const clientManifest = require('../../public/vue-ssr-client-manifest.json')
const bundle = require('../../ssr-build/server-entry.js').default

const renderer = VueServerRenderer.createRenderer({
	inject: false,
	clientManifest
})

//读取ejs模板
const template = fs.readFileSync(join(__dirname, '../views/server.ejs'), 'utf-8')

router.get('*', async (ctx, next) => {
  await serverRender(ctx, renderer, template, bundle)
})

module.exports = router.routes()