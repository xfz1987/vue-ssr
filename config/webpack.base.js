const { resolve } = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const createVueLoaderOpts = require('./vue-laoder.config')
const { ENV, isDev, assetsPath } = require('./env')

// image loader
const imageloaders = [
  {
    loader: 'url-loader',
    options: {
      limit: 10 * 1024,
      esModule: false,
      name: isDev ? 'images/[name].[ext]' : 'images/[name].[hash:5].[ext]',
      publicPath: assetsPath.publicPath      
    }
  }
]

if (!isDev) imageloaders.push({
  loader: 'image-webpack-loader',
  options: {
    bypassOnDebug: true
  }
})

module.exports = {
  mode: ENV,
	module: {
		rules: [
			{
				test: /\.(vue|jsx|js)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				enforce: 'pre' //在其他loader处理前，先eslint，post为之后
      },
      {
				test: /\.vue$/,
				loader: 'vue-loader',
				options: createVueLoaderOpts(isDev)
			},
			{
				test: /\.(jsx)$/,
				loader: 'babel-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    		loader: imageloaders
			}
		]
  },
  resolve: {
		alias: {
      'vue': resolve(__dirname, '../node_modules/vue/dist/vue.esm.js'),
      '@': resolve(__dirname, '../client'),
    },
    extensions: ['.vue', '.js', '.jsx', '.css']
	},
  devtool: isDev ? '#cheap-module-source-map' : false,
	plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
	]
};
