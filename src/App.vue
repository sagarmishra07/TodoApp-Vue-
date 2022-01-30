<template>
  <div id="app">
    <!-- app title -->
    <div class="title">
      <span>Todo App</span>

      <!-- search bar -->
      <div class="search">
        <input
          type="text"
          v-model="searchValue"
          name="search"
          placeholder="Search..."
        />
      </div>
    </div>
    <!-- todo input field -->

    <div v-if="!edditing" class="task-form">
      <div class="task-input">
        <input
          type="text"
          v-model="todo"
          name="text"
          placeholder="Enter Task"
        />
      </div>

      <button @click="addTask()">Add</button>
    </div>

    <!-- todo edit field -->
    <div v-else class="task-form">
      <div class="task-input">
        <input
          type="text"
          v-model="newTask"
          name="text"
          placeholder="Enter Task"
        />
      </div>

      <button @click="updateTask()">Update</button>
    </div>

    <!-- for task added,deleted message  -->
    <p v-if="added" :style="{ color: messageColor[0] }">Todo Added</p>
    <p v-show="edited" :style="{ color: messageColor[0] }">Todo Updated</p>
    <p v-show="deleted" :style="{ color: messageColor[1] }">Todo Deleted</p>

    <!-- todo display section -->
    <table id="tasklist">
      <tr>
        <th>Task</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      <tr v-for="task in filteredTasks" v-bind:key="task">
        <td>{{ task.todo }}</td>
        <td @click="changeStatus(task)">{{ task.status }}</td>
        <td>
          <i
            class="fas fa-pen"
            @click="editTask(task)"
            v-if="task.status == 'todo'"
            :style="{ color: messageColor[0] }"
          ></i>
          <i
            class="fas fa-trash"
            @click="deleteTask(task)"
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
      todos: [],
      newTask: "",
      status: "todo",
      searchValue: "",
      edditing: false,

      // message display for add, deleted update todo
      added: false,
      messageColor: ["teal", "red"],
      deleted: false,
      edited: false,

      // message display for add, deleted update todo
    };
  },
  methods: {
    addTask() {
      if (!this.todo) {
        alert("Fill up form");
      } else {
        this.todos.push({ todo: this.todo, status: this.status });
      }
      this.added = true;
      this.todo = "";
      setTimeout(() => (this.added = false), 1500);
    },
    deleteTask(task) {
      // if (confirm("Are you sure ?")) {

      // }
      this.todos.splice(this.todos.indexOf(task), 1);
      this.deleted = true;
      setTimeout(() => (this.deleted = false), 1500);
    },
    editTask(task) {
      this.edditing = true;

      this.newTask = task.todo;
      this.selectedIndex = this.todos.indexOf(task);
    },
    updateTask() {
      console.log("updateTask");
      if (!this.newTask) {
        alert("Fill the textbox");
      } else {
        this.todos.splice(this.selectedIndex, 1, {
          todo: this.newTask,
          status: "todo",
        });
        this.edited = true;
        this.newTask = "";
        setTimeout(() => (this.edited = false), 1500);
        this.edditing = false;
      }
    },
    changeStatus(task) {
      console.log("status");
      let index = this.todos.indexOf(task);
      this.todos.splice(index, 1, {
        todo: task.todo,
        status: "done",
      });
    },
  },
  computed: {
    filteredTasks() {
      return this.searchValue
        ? this.todos.filter((item) => {
            return item.todo
              .toUpperCase()
              .includes(this.searchValue.toUpperCase());
          })
        : this.todos;
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
