import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId:''
  },
  getters: {
  },
  mutations: {
    setSearchResult(state,userId){
      state.userId=userId;
    }
  },
  actions: {
  },
  modules: {
  }
})
