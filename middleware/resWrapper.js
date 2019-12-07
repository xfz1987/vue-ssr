
module.exports = async (ctx, next) => {
  const { body } = ctx
  if (body && body.data) {
    body.status = 0
  }
  await next()
}
