// Vue.component("my-component", {
//   template: "<h1>This is a Vue!!!!!!!</h1>",
// });

// Vue.component("todo-items", {
//   props: ["todo"],
//   template: `<li>{{todo.text}}</li>`,
// });

// const app = new Vue({
//   el: "#app", // Replace 'app' with the ID of the HTML element where you want to mount your Vue app
//   data: {
//     message: "Vue",
//   },
// });

// const app2 = new Vue({
//   el: "#app-2",
//   data: {
//     message: "You loaded this page on " + new Date().toLocaleString(),
//   },
// });

// const app3 = new Vue({
//   el: "#app-3",
//   data: {
//     seen: false,
//   },
// });

// const app4 = new Vue({
//   el: "#app-4",
//   data: {
//     todos: [
//       { text: "Something fishy" },
//       { text: "Idk" },
//       { text: "Vue is nice" },
//     ],
//   },
// });

// const app5 = new Vue({
//   el: "#app-5",
//   data: {
//     message: "I'm writing in Vue",
//   },
//   methods: {
//     reverseMessage: function () {
//       this.message = this.message.split("").reverse().join("");
//     },
//   },
// });

// const app6 = new Vue({
//   el: "#app-6",
//   data: {
//     message: "New data",
//   },
// });

// const app7 = new Vue({
//   el: "#app-7",
//   data: {
//     list: [
//       { id: 1, text: "Some text" },
//       { id: 2, text: "Some text 2" },
//       { id: 3, text: "Some text 3" },
//     ],
//   },
// });

// const app8 = new Vue({
//   el: "#app-8",
//   data: {
//     text: "random text",
//     isChanged: false,
//     bgColor: "green",
//     fntSize: "2rem",
//   },
//   methods: {
//     changeColor: function () {
//       this.isChanged = !this.isChanged;
//     },
//   },
// });

const todo = new Vue({
  el: "#todo",
  data: {
    todos: [],
    tags: ["FOOD", "GAMING"],
    inputValue: "",
    tagInput: "",
    newTagInput: "",
    isNewTagOpen: false,
  },
  methods: {
    addTodo: function () {
      const todo = {
        text: this.inputValue,
      };
      this.todos.push(todo);
    },
    createTag: function () {
      if (this.newTagInput.length < 3) {
        alert("Tag should be longer!");
        return;
      }
      this.tags.push(this.newTagInput.toUpperCase());
      this.newTagInput = "";
    },
    openNewTagForm: function () {
      this.isNewTagOpen = !this.isNewTagOpen;
    },
  },
});

const accordion = new Vue({
  el: "#app",
  data: {
    items: [
      { text: "Some text 1", subtext: "Sub text 1" },
      { text: "Some text 2", subtext: "Sub text 2" },
      { text: "Some text 3", subtext: "Sub text 3" },
      { text: "Some text 4", subtext: "Sub text 4" },
    ],
    currentOpen: -10,
  },
  methods: {
    toggle: function (index) {
      this.currentOpen = index;
    },
  },
});
