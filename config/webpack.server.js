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

const isBundle = process.env.NODE_TYPE === 'bundle'

const config = {
	target: 'node',
	entry: join(__dirname, '../client/entry-server.js'),
	output: {
		libraryTarget: 'commonjs2',//module.exports = xxx，因为是运行在node环境下的代码
		path: join(__dirname, isDev ? '../public' : '../ssr-build'),
		publicPath: assetsPath.publicPath
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
			}
		]
	},
	devtool: isDev ? 'source-map' : false,
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
if (isDev || isBundle) {
	config.plugins.push(new VueSSRServerPlugin())
} else {
	config.output.filename = 'server-entry.js'
}

module.exports = merge(baseConf, config)