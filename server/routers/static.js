const Router = require('koa-router')
const send = require('koa-send')

//router只会处理 /publc路径
const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('/*', async ctx => {
	await send(ctx, ctx.path)
})

module.exports = staticRouter.routes()