import Vue from 'vue'
import Vuex from 'vuex'

import * as user from './modules/user.js'
import * as reports from './modules/reports.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    reports
  }
})
