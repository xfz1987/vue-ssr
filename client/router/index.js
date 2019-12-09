import Vue from 'vue';
import VueRouter from 'vue-router';
import Meta from 'vue-meta';
Vue.use(VueRouter);
Vue.use(Meta);

export function createRouter() {
  const router = new VueRouter({
    mode: 'history',
    // base: '/base/' //localhost:8000/base/app
    linkActiveClass: 'active-class',
    linkExactActiveClass: 'exact-active-class',
    scrollBehavior (savedPosition) {
      return savedPosition || { x: 0, y: 0 }
    },
    fallback: true,
    routes: [
      { path: '/', component: () => import(/* webpackChunkName: "home" */ '../components/Home.vue') },
      { path: '/topics/:id', component: () => import(/* webpackChunkName: "topics" */ '../components/Topics.vue') },
      { path: '/counter', component: () => import(/* webpackChunkName: "counter" */ '../components/Counter.vue') },
      { path: '/about', component: () => import(/* webpackChunkName: "about" */ '../components/About.vue') },
      { path: '/test', component: () => import(/* webpackChunkName: "test" */ '../components/test/Test.vue') }
    ]
	});

	return router;
}
