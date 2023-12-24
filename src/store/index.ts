import { createStore } from "vuex";

export default createStore({
  state: {
    tasks: [
      {
        name: "Do the dishes",
        time: "9 am",
        id: 1,
      },
      {
        name: "Do the car wash",
        time: "10 am",
        id: 2,
      },
    ],
  },
  mutations: {
    removeTask(state, id) {
      console.log(id);
      state.tasks = state.tasks.filter((task) => {
        return task.id !== id;
      });
    },
  },
  actions: {},
  modules: {},
  getters: {},
});
