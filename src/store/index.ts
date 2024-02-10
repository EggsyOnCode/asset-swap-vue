import { endPoints } from "@/constants/apiEndpoints";
import { createStore } from "vuex";

import { fetchEventSource } from "@microsoft/fetch-event-source";
interface User {
  userId: number;
  userName: string;
  userWallet: string;
}
export default createStore({
  state: {
    user: {} as User,
    jwtToken: "",
    notificationCount: "",
  },
  mutations: {
    setUser(state, userObj) {
      state.user = userObj;
    },
    setJwtAccessToken(state, token) {
      state.jwtToken = token;
    },
  },
  actions: {
    async initSSEListener({ commit, state }) {
      await fetchEventSource(`${endPoints.notificationEvent}/count`, {
        headers: {
          Authorization: `Bearer ${state.jwtToken}`,
        },
        onmessage(ev) {
          if (ev.id !== "" && ev.data !== "") {
            const data = JSON.parse(ev.data);
            console.log(data.unreadCount);
            state.notificationCount = data.unreadCount;
          }
        },
      });
    },
  },

  modules: {},
  getters: {
    getToken(state) {
      return state.jwtToken;
    },
    getUserId(state) {
      return state.user.userId;
    },
    getUserWallet(state) {
      return state.user.userWallet;
    },
    getUsername(state) {
      return state.user.userName;
    },

    getNotificationCount(state) {
      return state.notificationCount;
    },
  },
});
