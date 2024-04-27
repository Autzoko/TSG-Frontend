import { createStore } from 'vuex'

export default createStore({
  state: {
    auth: {
      loggedIn: false,
    },
  },
  getters: {
  },
  mutations: {
    login(state) {
      state.auth.loggedIn = true;
    },
    logout(state) {
      state.auth.loggedIn = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
