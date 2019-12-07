const ApiService = require('../service/ApiService')

class apiController {
  async getCity(ctx){
    const result = await ApiService.getCity()
    ctx.body = result
  }

  getVersion(ctx){
    const result = ApiService.getVersion()
    ctx.body = result
  }
}

module.exports = new apiController()
