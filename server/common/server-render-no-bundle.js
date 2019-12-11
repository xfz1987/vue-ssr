const ejs = require('ejs')

module.exports = async (ctx, renderer, template, bundle) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path }

  try {
    // const appString = await renderer.renderToString(context)
    const app = await bundle(context)

    // if (context.router.currentRoute.fullPath !== ctx.path) {
    //   return ctx.redirect(context.router.currentRoute.fullPath)
    // }

    const appString = await renderer.renderToString(app, context)

    const _meta = (context.meta && context.meta.inject()) || {}
    const { title, meta } = _meta

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
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
