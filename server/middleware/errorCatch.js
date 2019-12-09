// 容错处理
module.exports = async (ctx, next) => {
  // 500
  try {
    await next()
  } catch (error) {
    ctx.logger.error(error)
    ctx.status = error.status || 500
    ctx.body = '请求出错'
    ctx.app.emit('error', error, ctx);
  }
}
