const webpack = require('webpack')
const { join } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const baseConf = require('./webpack.base')
const { ENV, isDev, assetsPath } = require('./env')

let config = {
  target: 'web',
	entry: {
    app: join(__dirname, '../client/entry-client.js')
  },
	output: {
		filename: isDev ? 'scripts/[name].js' : 'scripts/[name].[contenthash:5].js',
    path: join(__dirname, '../public'),
    publicPath: assetsPath.publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      'process.env.VUE_ENV': '"client"'
    }),
    //该文件包就是前端资源文件的路径及异步加载文件的路径和关系的图谱
    //该文件用于服务端渲染时，写入html中script与link所用
    new VueSSRClientPlugin()
  ]
}

if (isDev) {
  config = merge(baseConf, config, {
    devServer: {
      clientLogLevel: 'warning',
      port: '3000',
      publicPath: '/',
      contentBase: join(__dirname, '../public'),
      //编译错误时，显示在网页上
      overlay: {
        errors: true
      },
      historyApiFallback: {
        index: '/index.html'
        // rewrites: [
        //   { from: /.*/, to: posix.join(, 'index.html') },
        // ],
      },
      //加上这个，否则无法热更替，因为资源跨域了
      headers: { 'Access-control-Allow-Origin': '*' },
      proxy: {
        '/api': 'http://127.0.0.1:8081',
      },
      // 热更新内容，而不会刷新页面
      hot: true
    },
    plugins: [
      new FriendlyErrorsPlugin(),
      new WebpackBuildNotifierPlugin({
        title: '🌶 Webpack Build',
        logo: join(__dirname, '../favicon.ico'),
        suppressSuccess: true
      }),
      new HtmlWebpackPlugin({
        template: join(__dirname, 'template.html'),
        name: 'index.html'
      }),
    ]
  })
} else {
  config = merge(baseConf, config, {
    externals: {
      'vue': 'Vue',
      'vuex':'Vuex',
      'vue-router':'VueRouter'
    },
    optimization: {
      minimize: true,
      runtimeChunk: {
        name: 'manifest'
      },
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            name: "commons"
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/, //如果上面chunks定为all，就是找到所有的import文件，看他是不是调用于 node_modules 文件夹 是的话就拆分
            priority: -10,//优先级 比如同时符合vender 和 default 这个优先级高 所以存在这里
            filename: 'vendors.js', //拆分后打包的文件名字
          },
        }
      }
    },
    plugins: [
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
      new HtmlWebpackPlugin({
        template: join(__dirname, '../client/index.html'),
        name: 'index.html'
      }),
      // new BundleAnalyzerPlugin({ analyzerPort: 3011 }),
    ]
  })
}

module.exports = config
