import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import util from '../libs/utils'

const defaultState = {
    topics: [],
    count: 0
}

// const inBrowser = typeof window !== 'undefined';
// if (!inBrowser || process.env.NODE_ENV == "development") {
    Vue.use(Vuex);
// }
// if in browser, use pre-fetched state injected by SSR
// const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

const mutations = {
    TOPICS_LIST: (state, topics) => {
        state.topics = topics
    },

    INCREMENT: (state) => {
       state.count = util.increment(state.count);
    },

    DECREMENT: (state) => {
       state.count = util.decrement(state.count);
    }
}
export function createStore() {
  return new Vuex.Store({
    // 开发环境开启严格模式，生产环境关闭
	strict: process.env.NODE_ENV === 'development',
    state: defaultState,
    actions,
    mutations,
    getters
  });
}
