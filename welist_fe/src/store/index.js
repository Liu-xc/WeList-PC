import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import * as mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoItemToEdit: {},
    logItemToEdit: {},
    shareItemToEdit: {},
    userInfo: {},
    todoList: [],
    shareList: [],
    logList: [],
    logStatus: false
  },
  mutations,
  actions,
  getters
})
