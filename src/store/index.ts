import { createStore } from "vuex";
interface User {
  userId: number;
  userName: string;
}
export default createStore({
  state: {
    user: {} as User,
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
  getters: {
    getToken(state) {
      return state.jwtToken;
    },
    getUserId(state) {
      return state.user.userId;
    },
    getUsername(state) {
      return state.user.userName;
    },
  },
});
