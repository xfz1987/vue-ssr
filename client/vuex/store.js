import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import util from '../libs/utils'

const defaultState = {
    topics: [],
    count: 0
}

const inBrowser = typeof window !== 'undefined';
console.log('前端开发环境',process.env.NODE_ENV);
if (!inBrowser || process.env.NODE_ENV == "development") {
    Vue.use(Vuex);
}
// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

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
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters
    });
    return store;
}
