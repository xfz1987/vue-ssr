const ENV = process.env.NODE_ENV || 'development'
const isDev = ENV == 'development'

const assetsPath = {
  'development': {
    publicPath: 'http://127.0.0.1:3000/'
  },
  'production': {
    publicPath: '/public/'
  }
}

module.exports = {
  ENV,
  isDev,
  assetsPath: assetsPath[ENV]
}