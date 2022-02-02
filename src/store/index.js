import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
  },
  getters: {
    allTodos: (state) => {
      return state.todos;
    },
  },
  mutations: {
    addTask(state, payload) {
      if (!payload.todo) {
        alert("No data");
      } else {
        state.todos.push({ todo: payload.todo, status: payload.status });
        payload.todo = "";
      }
    },
    deleteTask(state, index) {
      state.todos.splice(index, 1);
    },
    updateTask(state, payload) {
      if (!payload.todo) {
        alert("Fill the textbox");
      } else {
        state.todos.splice(payload.index, 1, {
          todo: payload.todo,
          status: payload.status,
        });
        payload.todo = "";
      }
    },
    changeStatus(state, payload) {
      state.todos.splice(payload.index, 1, {
        todo: payload.todo,
        status: !payload.status,
      });
    },
  },
  actions: {},
  modules: {},
});
