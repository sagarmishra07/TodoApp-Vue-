<template>
  <div id="app">
    <!-- app title -->
    <div class="title">
      <span>Todo App</span>

      <!-- search bar -->
      <!-- <div class="search">
        <input
          type="text"
          v-model="searchValue"
          name="search"
          placeholder="Search..."
        />
      </div> -->
    </div>
    <!-- todo input field -->

    <div class="task-form">
      <div class="task-input" v-show="!edditing">
        <input
          type="text"
          v-model="todo"
          name="text"
          placeholder="Enter Task"
        />
      </div>
      <div class="task-input" v-show="edditing">
        <input
          type="text"
          v-model="newTask"
          name="text"
          placeholder="Enter Task"
        />
      </div>
      <button @click="edditing ? updateTask() : addTask()">
        {{ !edditing ? "Add" : "Update" }}
      </button>
    </div>

    <!-- todo display section -->
    <table id="tasklist">
      <tr>
        <th>Task</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      <tr v-for="(task, index) in filteredTasks" v-bind:key="index">
        <td>{{ task.todo }}</td>
        <td @click="changeStatus(task, index)">
          {{ task.status ? "Todo" : "Done" }}
        </td>

        <td>
          <i
            class="fas fa-pen"
            @click="editTask(task, index)"
            v-if="task.status"
            :style="{ color: messageColor[0] }"
          ></i>
          <i
            class="fas fa-trash"
            @click="deleteTask(index)"
            :style="{ color: messageColor[1] }"
          ></i>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      todo: "",
      newTask: "",
      status: true,
      searchValue: "",
      edditing: false,
      selectedIndex: null,
      messageColor: ["teal", "red"],
    };
  },
  methods: {
    addTask() {
      this.$store.commit("addTask", {
        todo: this.todo,
        status: this.status,
      });
      this.todo = "";
    },
    deleteTask(index) {
      this.$store.commit("deleteTask", index);
    },
    editTask(task, index) {
      this.edditing = true;

      this.newTask = task.todo;
      this.selectedIndex = index;
    },
    updateTask() {
      this.$store.commit("updateTask", {
        index: this.selectedIndex,
        todo: this.newTask,
        status: this.status,
      });

      this.edditing = false;
    },
    changeStatus(task, index) {
      this.$store.commit("changeStatus", {
        todo: task.todo,
        index: index,
        status: task.status,
      });
    },
  },
  computed: {
    filteredTasks() {
      return this.$store.getters.allTodos;
    },
  },
};
</script>

<style>
body {
  background-color: #166974;
}
#app {
  margin-top: 5%;
  margin-left: 35%;
  padding: 0;
  border: 5px solid rgb(112, 19, 66);
  border-radius: 10%;
  background: whitesmoke;
  height: auto;
  width: 500px;
}

.title .search {
  display: flex;
  justify-content: center;
}
.title .search input[type="text"] {
  border-radius: 30px;
  font-size: 12px;
  width: 70px;
  background: whitesmoke;
  height: 25px;
  position: absolute;
  margin: 7px 0px 0px 130px;
}
.title .search input[type="text"]::placeholder {
  text-align: center;
}

.title {
  margin: 7%;
  display: flex;
  justify-content: center;
}
.title span {
  color: #a04384;
  font-size: 35px;
}
.task-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.task-form .task-input {
  padding-bottom: 3%;
  display: flex;
  justify-content: center;
}

.task-input input[type="text"] {
  border-radius: 30px;
  font-size: 16px;
  width: 150px;
  background: whitesmoke;
  height: 35px;
  margin-top: 5%;
}

.task-form .task-input input[type="text"]::placeholder {
  font-size: 15px;
  text-align: center;
  color: #a04384;
}

.task-form .task-input input[type="text"]:focus {
  width: 170px;
  transition: 0.1s;
  color: #a04384;
}

.task-form Button {
  background-color: #886371;
  width: 30%;
  color: whitesmoke;
  border-radius: 50px;
  margin-bottom: 5%;
  height: 35px;
}
.task-form Button:hover {
  background-color: #166974;
  width: 32%;
  transition: 0.2s;
}

Button {
  padding-top: 0px;

  margin-right: 10px;
  background-color: #d77fa1;

  border-radius: 50px;
}
Button:hover {
  background-color: #baabda;
}

#tasklist {
  border-collapse: collapse;
  width: 96%;
  margin: 20px 0px 20px 30px;
  border-radius: 0px;
}

#tasklist td {
  padding: 25px 0px 0px 0px;

  text-align: center;
}
i {
  cursor: pointer;
  margin: 8px;
}
p {
  margin: 10px;
  padding: 0;
  font-size: 20px;
  text-align: center;
}
</style>
