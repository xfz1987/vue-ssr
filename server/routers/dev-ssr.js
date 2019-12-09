/**
 * 开发环境路由处理
 */
const router = require('koa-router')()
const axios = require('axios')
const path = require('path')
const fs = require('fs')
//文件读写在内存中操作
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const { createBundleRenderer } = require('vue-server-renderer')
const serverConfig = require('../../config/webpack.server')
const serverRender = require('../common/server-render')

/* start 在node中运行webpack */
//获取webpack配置
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
//指定webpack的输出也就是vue-ssr-server-bundle.json在内存中读写
serverCompiler.outputFileSystem = mfs

//每次打包生成的新的文件
let bundle = undefined
//监听每次文件变化（err打包错误，eslint错误在stats中）
serverCompiler.watch({}, (err, stats) => {
	if (err) throw err
	stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))

  //获取webpack.server输出的默认json
  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  //读取的json字符串转化成对象
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))

  console.log('================= new bundle generlate ========================')
})
/* end */

/* node 返回 渲染的html */
const handleSSR = async (ctx) => {
	if (!bundle) {
		ctx.body = 'please wait for a monment, html will come soon'
	} else {
		//因为在开发环境中，文件都在内存中，因此需要ajax向客户端webpack-dev-server发起请求来获取文件
		const clientManifestResp = await axios.get('http://127.0.0.1:3000/vue-ssr-client-manifest.json')
		//客户端静态资源的路径
		const clientManifest = clientManifestResp.data

		//读取模板
		const template = fs.readFileSync(path.join(__dirname, '../views/server-template.ejs'), 'utf-8')
		// const template = 'server-template'
		
		const renderer = createBundleRenderer(bundle, {
			inject: false,
			clientManifest
		})

		await serverRender(ctx, renderer, template)
	}	
}

//配置路由
router.get('*', handleSSR)

module.exports = router.routes()