import { route, GET } from 'awilix-koa'

@route('/')
@route('/index')
@route('/index.html')
export default class Index {
  // 注入IndexService
  constructor({ indexService }) {
    this.indexService = indexService
  }

  index(ctx) {
    ctx.body = 'test'
  }

  @route('/index/getdata')
  @GET()
  async getData(ctx) {
    const result = await this.indexService.getUserInfo()
    ctx.body = result
  }
}
