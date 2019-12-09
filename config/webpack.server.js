/**
 * webpack打包生成vue-ssr-server-bundle.json文件，不会生成js文件
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')//服务端渲染，生成json文件，来处理逻辑
const nodeExternals = require('webpack-node-externals')
const { join } = require('path')
const baseConf = require('./webpack.base')
const { ENV, isDev, assetsPath } = require('./env')

const config = {
	target: 'node',
	entry: join(__dirname, '../client/entry-server.js'),
	output: {
		libraryTarget: 'commonjs2',//module.exports = xxx，因为是运行在node环境下的代码
		filename: 'server-entry.js',
		path: join(__dirname, '../public'),
		publicPath: assetsPath.publicPath
	},
	devtool: isDev ? false : 'source-map',
	//抽出依赖包
	externals: nodeExternals({
    whitelist: /\.css$/
  }),
	plugins: [
		new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      'process.env.VUE_ENV': '"server"'
    })
	]
};

//开发环境使用 vue-ssr-server-bundle.json，生产环境使用 server-entry.js
if (isDev) {
	config.plugins.push(new VueSSRServerPlugin())
}

module.exports = merge(baseConf, config)