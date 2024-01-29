import { createStore } from "vuex";

export default createStore({
  state: {
    user: {},
    jwtToken: "",
  },
  mutations: {
    setUser(state, userObj) {
      state.user = userObj;
    },
    setJwtAccessToken(state, token) {
      state.jwtToken = token;
    },
  },
  actions: {},
  modules: {},
  getters: {},
});
