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
  <div v-if="getPages(todos).length > 1" class="pagination">
    <div>
      <p class="pagination-item" v-bind:class="{'active-page': currentpage === page}" v-for="page in getPages(todos)">{{page}}</p>
    </div>
    <div class="pagination-buttons-box">
      <button title="Previous page" v-if="currentpage > 1" @click="changepage('prev')" class="pagination-button">&lt;</button>
      <button title="Next page" v-if="currentpage !== getPages(todos).length" @click="changepage('next')" class="pagination-button">&gt;</button>
    </div>
  </div>`,
});

Vue.component("custom-message", {
  props: {
    messagetext: String,
  },
  template: `
  <div class="message">
    <p class="message-text">{{messagetext}}</p>
  </div>
  `,
});

const getTagIdFromTags = (tags, selected) => {
  return tags.find((tag) => {
    if (tag.tagText === selected) return tag.tagId;
  });
};

const checkIfTodosExistWithTag = (tagId, todos) => {
  return todos.filter((todo) => todo.tag.tagId === tagId);
};

const todo = new Vue({
  el: "#todo",
  data: {
    todos: [],
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
    messageText: "Error",
    isMessage: false,
  },
  created() {
    const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
    const localStorageTags = JSON.parse(localStorage.getItem("tags"));
    if (localStorageTags) {
      this.todos = localStorageTags;
    }
    if (localStorageTodos) {
      this.todos = localStorageTodos;
    }
    this.filterButtonColors = this.generateRandomColors();
  },
  methods: {
    saveTodos: function () {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    saveTags: function () {
      localStorage.setItem("tags", JSON.stringify(this.tags));
    },
    addTodo: function () {
      if (!this.selected) {
        this.displayMessage("Select tag!");
        return;
      }
      if (this.inputValue < 4) {
        this.displayMessage("Todo should be longer!");
        return;
      }

      const todo = {
        text: this.inputValue,
        tag: { tagId: this.selected.tagId, tagText: this.selected.tagText },
        id: this.todos.length + 1,
      };

      this.todos.push(todo);
      this.inputValue = "";
      this.saveTodos();
    },
    completeTodo: function (todoId) {
      const indexOfTodo = this.todos.findIndex((todo) => todo.id === todoId);
      this.todos.splice(indexOfTodo, 1);
      this.saveTodos();
    },
    createTag: function () {
      if (this.newTagInput.length < 3) {
        this.displayMessage("Tag should be longer!");
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
      this.saveTags();
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
      let fontColor;
      if ((red < 100 && blue < 100) || (red < 100 && green < 100)) {
        fontColor = `rgb(248, 249, 250)`;
      } else {
        fontColor = `rgb(52, 58, 64)`;
      }

      return { backgroundColor: color, fontColor };
    },
    activateFilterButton: function (buttonId) {
      this.currentPage = 1;
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
      if (checkIfTodosExistWithTag(tagId, this.todos).length) {
        this.displayMessage(
          "There are todo items associated with this tag. Delete them first!"
        );
        return;
      }
      this.tags = this.tags.filter((tag) => tag.tagId !== tagId);
      this.saveTags();
    },
    displayMessage: function (message) {
      this.messageText = message;
      this.isMessage = true;
      setTimeout(() => {
        this.isMessage = false;
      }, 4000);
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
