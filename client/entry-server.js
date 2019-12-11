import { createApp } from './app.js'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    
    // 把访问后端的真实路由地址跳转到客户端vue的虚拟路由，进入转到相应的vue页面
    router.push(context.url)
    
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            route: router.currentRoute,
            store,
            router
          })
        }
      })).then(() => {
        context.state = store.state
        context.meta = app.$meta()
        context.router = router
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}