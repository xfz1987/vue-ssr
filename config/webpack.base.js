const { resolve } = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const createVueLoaderOpts = require('./vue-laoder.config')
const { ENV, isDev, assetsPath } = require('./env')

// css loader
const cssLoaders = [
  { loader: 'css-loader', options: { importLoaders: 1 } },
  'postcss-loader'
]

cssLoaders.unshift(isDev ? 'vue-style-loader': MiniCssExtractPlugin.loader)

// css plugin
const cssPlugins = isDev ? [] : [
  // 提取css
  new MiniCssExtractPlugin({
    filename: 'styles/[name].[contenthash:5].css',
    // chunkFilename: 'styles/[name].[contenthash:5].css'
  }),
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeUnicode: false
      }]
    },
    canPrint: true
  }),
]

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
				test: /\.css$/,
				use: cssLoaders
			},
			{
				test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
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
    new VueLoaderPlugin(),
    ...cssPlugins
	]
};
