// import Vue from 'vue'
import { createApp } from './app.js'

// 客户端特定引导逻辑……
const { router, app, store } = createApp()

// a global mixin that calls `asyncData` when a route component's params change
// Vue.mixin({
//   beforeRouteUpdate(to, from, next) {
//     debugger
//     const { asyncData } = this.$options
//     if (asyncData) {
//       asyncData({
//         store: this.$store,
//         route: to
//       }).then(next).catch(next)
//     } else {
//       next()
//     }
//   }
// })


if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  // router.beforeResolve((to, from, next) => {
  //   const matched = router.getMatchedComponents(to)
  //   const prevMatched = router.getMatchedComponents(from)

  //   // 我们只关心非预渲染的组件
  //   // 所以我们对比它们，找出两个匹配列表的差异组件
  //   let diffed = false
  //   const activated = matched.filter((c, i) => {
  //     return diffed || (diffed = (prevMatched[i] !== c))
  //   })

  //   if (!activated.length) {
  //     return next()
  //   }

  //   // 这里如果有加载指示器 (loading indicator)，就触发
  //   Promise.all(activated.map(c => {
  //     if (c.asyncData) {
  //       return c.asyncData({ store, route: to })
  //     }
  //   })).then(() => {
  //     // 停止加载指示器(loading indicator)
  //     next()
  //   }).catch(next)
  // })

  app.$mount('#app')
})
