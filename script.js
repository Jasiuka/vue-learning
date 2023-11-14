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
      selected: { text: "Select tag", id: -1 },
      isOptionsOpen: false,
      isScrollNeeded: false,
      animateIcon: false,
    };
  },
  props: {
    tags: Array,
  },
  methods: {
    selectTag: function (tagId, tagText) {
      this.selected = { id: tagId, text: tagText };
      this.$emit("tag-selected", {
        tagText: this.selected.text,
        tagId: this.selected.id,
      });
      this.isOptionsOpen = false;
    },
    toggleOptions: function () {
      this.isOptionsOpen = !this.isOptionsOpen;
    },
  },
  template: `<div class="custom-select">
        <h3  class="custom-select-display" v-bind:class="{'custom-select-display-selected': selected.id !== -1}" v-on:click="toggleOptions">
          <span>{{selected?.text}}</span>
          <span class="custom-select-icon" :key="this.isOptionsOpen ? 'icon-open' : 'icon-closed'">{{this.isOptionsOpen ? "-":"+"}}</span>
        </h3>
        <div class="custom-select-options" v-bind:class="{ \'custom-select-options__open\': isOptionsOpen, \'custom-select-options__scroll':tags.length > 3}">
          <div class="custom-select-option" v-for="{tagId,tagText} in tags">
            <input v-on:change="selectTag(tagId,tagText)"  class="custom-select-radio" type="radio" v-bind:id="tagText" name="custom-select" s/>
            <label class="custom-select-label" v-bind:for="tagText">{{tagText}}</label>
          </div>
        </div>
      </div>`,
});

Vue.component("custom-pagination", {
  data: function () {
    return {
      itemsPerPage: 5,
    };
  },
  props: {
    todos: Array,
    changepage: Function,
    currentpage: Number,
  },
  methods: {
    getPages: function (todos) {
      const pagesCount = Math.ceil(todos.length / 5);
      return Array.from({ length: pagesCount }, (_, index) => index + 1);
    },
  },
  template: `
  <div class="pagination">
    <div>
      <p class="pagination-item" v-bind:class="{'active-page': currentpage === page}" v-for="page in getPages(todos)">{{page}}</p>
    </div>
    <div class="pagination-buttons-box">
      <button @click="changepage('prev')" class="pagination-button">&lt;</button>
      <button @click="changepage('next')" class="pagination-button">&gt;</button>
    </div>
  </div>`,
});

const getTagIdFromTags = (tags, selected) => {
  return tags.find((tag) => {
    if (tag.tagText === selected) return tag.tagId;
  });
};

const todo = new Vue({
  el: "#todo",
  data: {
    view: "comp-A",
    todos: [
      {
        text: "Text 1",
        tag: { tagId: 0, tagText: "General" },
        id: 1,
      },
      {
        text: "Text 2",
        tag: { tagId: 0, tagText: "General" },
        id: 2,
      },
      {
        text: "Text 3",
        tag: { tagId: 0, tagText: "General" },
        id: 3,
      },
      {
        text: "Text 4",
        tag: { tagId: 0, tagText: "General" },
        id: 4,
      },
      {
        text: "Text 5",
        tag: { tagId: 0, tagText: "General" },
        id: 5,
      },
      {
        text: "Text 6",
        tag: { tagId: 0, tagText: "General" },
        id: 6,
      },
      {
        text: "Text 7",
        tag: { tagId: 1, tagText: "Food" },
        id: 7,
      },
      {
        text: "Text 8",
        tag: { tagId: 1, tagText: "Food" },
        id: 8,
      },
    ],
    tags: [
      { tagId: 0, tagText: "General" },
      { tagId: 1, tagText: "Food" },
      { tagId: 2, tagText: "Work" },
    ],
    activeFilters: [],
    inputValue: "",
    tagInput: "",
    newTagInput: "",
    isNewTagOpen: false,
    selected: "",
    styleObject: {},
    filterButtonColors: [],
    isHome: true,
    currentPage: 1,
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

      const todo = {
        text: this.inputValue,
        tag: { tagId: this.selected.tagId, tagText: this.selected.tagText },
        id: this.todos.length,
      };

      this.todos.push(todo);
      this.inputValue = "";
    },
    createTag: function () {
      if (this.newTagInput.length < 3) {
        alert("Tag should be longer!");
        return;
      }
      this.tags.push({
        tagId: this.tags.length,
        tagText: this.newTagInput.toUpperCase(),
      });
      this.filterButtonColors = [
        ...this.filterButtonColors,
        this.generateRandomColor(),
      ];
      this.newTagInput = "";
    },
    openNewTagForm: function () {
      this.isNewTagOpen = !this.isNewTagOpen;
      this.isCreateTagOpen = !this.isCreateTagOpen;
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
          this.activeFilters.includes(todo.tag.tagId)
      );
    },
    turnActive: function (buttonId) {
      return this.activeFilters.includes(buttonId);
    },
    updateSelected: function (selectedTag) {
      this.selected = selectedTag;
    },
    changeTab: function (value) {
      if (!this.isHome) {
        this.isNewTagOpen = false;
      }
      this.isHome = value;
    },
    deleteTag: function (tagId) {
      this.tags = this.tags.filter((tag) => tag.tagId !== tagId);
    },
    getFiveTodos: function (todos) {
      const startIndex = this.currentPage * 5 - 5;
      const endIndex = this.currentPage * 5;
      return todos.splice(startIndex, endIndex);
    },
    changePage: function (value) {
      const maxPages = Math.ceil(this.filteredTodos().length / 5);
      if (value === "next") {
        if (this.currentPage === maxPages) {
          this.currentPage = 1;
          return;
        }
        this.currentPage++;
      }
      if (value === "prev") {
        if (this.currentPage === 1) {
          this.currentPage = maxPages;
          return;
        }
        this.currentPage--;
      }
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
