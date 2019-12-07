const { extend } = require('lodash')
const { join } = require('path')

const env = process.env.NODE_ENV || 'development'
const envConfig = require(`./${env}.config`)

console.log('env: ', env)

let baseConfig = {
  viewDir: join(__dirname, '..', 'views'),
  staticDir: join(__dirname, '..', 'public'),
  env,
}

const config = extend(baseConfig, envConfig)

module.exports = config
