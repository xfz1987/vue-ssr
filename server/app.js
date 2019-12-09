const Koa = require('koa')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const onerror = require('koa-onerror')
const cors = require('@koa/cors')
const serve = require('koa-static')
const render = require('koa-swig')
const send = require('koa-send')
const router = require('./routers')
const co = require('co')
const { configure, getLogger } = require('log4js')
const { join, resolve } = require('path')
const config = require('./config')
const errorCatch = require('./middleware/errorCatch')
const resWrapper = require('./middleware/resWrapper')

const app = new Koa()

/**
 * Nginx 通过设置 X-Forwarded-For 告诉 Koa 它为谁做代理
 * 如果 Koa 为配置 app.proxy = true，则忽略Nginx 在 HTTP 请求头部添加的 X-Forwarded-For
 */
app.proxy = true

// logger
configure({
	appenders: { cheese: { type: 'file', filename: resolve(__dirname, '../logs/server.log') } },
	categories: { default: { appenders: ['cheese'], level: 'error' } }
})
const logger = getLogger('cheese')
app.context.logger = logger

// error handler
onerror(app)

// errorCatcfh
app.use(errorCatch)

// middlewares
app.use(bodyparser())
app.use(json())

// cors
app.use(cors({ credentials: true }))

// 配置静态文件目录
app.use(serve(config.staticDir))

// 模版引擎
app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  cache: 'memory',
  ext: 'html',
  varControls: ["[[","]]"],//默认动态数据是{{}}，但是为了与vue区分开来，改为[[xxx]]
  writeBody: false
}))

// Time Logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${Date.now()} - ${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 处理favicon
app.use(async (ctx, next) => {
	if (ctx.path === '/favicon.ico') {
		await send(ctx, '/favicon.ico', { root: join(__dirname, '.') })
	} else {
		await next()
	}
})

// wrap res.data
app.use(router.routes())

// wrap res.data
app.use(resWrapper);

// 最后捕获，并 log
app.on('error', (err, ctx) => {
  console.error('【server error】', err, ctx)
})

module.exports = app