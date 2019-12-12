const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
	ctx.headers['Content-Type'] = 'text/html'

	const context = { url: ctx.path }

	try {
		const appString = await renderer.renderToString(context)
		// const appStream = await renderer.renderToStream(context)
		
		const _meta = (context.meta && context.meta.inject()) || {}
		const { title, meta } = _meta

		const html = ejs.render(template, {
			// 被渲染为字符串的 vue 实例
			appString,
			/*
			 * context.renderStyles() 将返回内联 style 标签包含的所有关键 CSS，其中关
			 * 键 CSS 是在要用到 .vue 组件的渲染过程中收集的
			*/
			style: context.renderStyles(),
			/**
       * 1. context.renderScripts() 返回引导客户端应用所需的 <script> 标签
       * 2. 需要 clientManifest，即客户端 bundle
       */
			scripts: context.renderScripts(),
      title: title ? title.text() : '',
      meta: meta ? meta.text() : '',
			initalState: context.renderState()
		})

		ctx.body = html
	} catch (err) {
		console.log('render error', err)
		throw err
	}
}