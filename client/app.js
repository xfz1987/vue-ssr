/**
 * 给服务端渲染用的，与之前不同之处就是，每次服务器渲染要重新创建一个vue实例，否则会之前渲染的状态冲突
 * 返回创建实例的方法
 */
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './vuex/store'
import { sync } from 'vuex-router-sync'
import './assets/styles/common.css'

export function createApp () {
  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()
  // 同步路由状态(route state)到 store
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 暴露 app, router 和 store
  return { app, router, store }
}
