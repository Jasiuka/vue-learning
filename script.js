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

Vue.component("custom-select", {
  data: function () {
    return {
      selected: "Select tag",
    };
  },
  props: ["tags"],
  methods: {
    selectTag: function (tagId) {
      console.log(tagId);
    },
  },
  template:
    '<div class="custom-select"><h3>{{selected.text}}</h3><div class="custom-select-option" v-for="{tagId,tagText} in tags"> <input v-model="selected" type="radio" id="tagText" name="custom-select" :value="{id: tagId, text: tagText}"/> <label for="tagText">{{tagText}}</label> </div></div>',
});

const todo = new Vue({
  el: "#todo",
  data: {
    todos: [],
    tags: [
      { tagId: 0, tagText: "FOOD" },
      { tagId: 1, tagText: "GAMING" },
    ],
    activeFilters: [],
    inputValue: "",
    tagInput: "",
    newTagInput: "",
    isNewTagOpen: false,
    selected: "",
    styleObject: {},
    filterButtonColors: [],
  },
  created() {
    this.filterButtonColors = this.generateRandomColors();
  },
  methods: {
    addTodo: function () {
      if (!this.selected) {
        alert("Select tag!");
        return;
      }
      if (this.inputValue < 4) {
        alert("Todo should be longer!");
        return;
      }
      console.log(this.todos);
      const todo = {
        text: this.inputValue,
        tag: this.selected,
        id: this.todos.length,
        tagId: this.tags.indexOf(this.selected),
      };

      console.log(todo);
      this.todos.push(todo);
      this.inputValue = "";
    },
    createTag: function () {
      if (this.newTagInput.length < 3) {
        alert("Tag should be longer!");
        return;
      }
      this.tags.push(this.newTagInput.toUpperCase());
      this.filterButtonColors = [
        ...this.filterButtonColors,
        this.generateRandomColor(),
      ];
      this.newTagInput = "";
    },
    openNewTagForm: function () {
      this.isNewTagOpen = !this.isNewTagOpen;
    },
    generateRandomColors: function () {
      return this.tags.map(() => this.generateRandomColor());
    },
    generateRandomColor: function () {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);

      const color = `rgb(${red}, ${green}, ${blue})`;

      return color;
    },
    activateFilterButton: function (buttonId) {
      if (this.activeFilters.includes(buttonId)) {
        this.activeFilters = [
          ...this.activeFilters.filter(
            (activeFilter) => activeFilter !== buttonId
          ),
        ];
        return;
      }
      this.activeFilters.push(buttonId);
    },
    filteredTodos: function () {
      return this.todos.filter(
        (todo) =>
          this.activeFilters.length === 0 ||
          this.activeFilters.includes(todo.tagId)
      );
    },
    turnActive: function (buttonId) {
      return this.activeFilters.includes(buttonId);
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
