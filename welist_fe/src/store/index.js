import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import * as mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoItemToEdit: null,
    logItemToEdit: null,
    shareItemToEdit: null,
    userInfo: {},
    todoList: [],
    shareList: [],
    logList: [],
    likeShareList: [],
    likeList: [],
    logStatus: false
  },
  mutations,
  actions,
  getters
})
