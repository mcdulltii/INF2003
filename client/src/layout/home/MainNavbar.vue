<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="position: fixed; top: 0; width: 100%; z-index: 999">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"> BLUDIT </a>
      <drop-down v-if="$route.path === '/'" class="navbar-brand" title="Home" title-classes="nav-link" icon="ti-home">
        <input type="text" id="filterBar" @input="updateFilteredSubreddits" v-model="filterQuery" placeholder="Filter...">
        <!-- Display the filteredSubreddits based on user input -->
        <a v-for="subreddit in filteredSubreddits" :key="subreddit" class="dropdown-item subreddit-option" href="#">
          {{ subreddit }}
        </a>
      </drop-down>
      <a class="navbar-toggler navbar-burger" type="button" @click="toggleSidebar"
        :aria-expanded="$sidebar.showSidebar" aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <!-- <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-panel"></i>
              <p>Stats</p>
            </a>
          </li> -->
          <li class="nav-item">
            <div class="search-container nav-link">
              <input type="text" class="search-input" v-model="searchQuery" placeholder="Search...">
              <a class="search-btn" @click="getPostsFromSearch" href="#">
                <i class="ti-search"></i>
              </a>
            </div>
          </li>
          <li class="nav-item">
            <a v-if="true" href="#/login" class="nav-link">
              <i class="ti-face-smile"></i>
              <p>Login/Register</p>
            </a>
          </li>
          <li class="nav-item">
            <drop-down v-if="true" class="nav-item" title="Username" title-classes="nav-link" icon="ti-face-smile">
              <a class="dropdown-item" style="margin-right: 60px;" href="#/userprofile">Profile</a>
              <a class="dropdown-item" style="margin-right: 60px" href="#/usersettings">User Settings</a>
            </drop-down>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../services/eventBus.js';

export default {
  data() {
      return {
        activeNotifications: false,
        filterQuery: "",
        searchQuery: "",
        popularSubreddits: [
          "r/funny",
          "r/AskReddit",
          "r/science",
          "r/gaming",
        ],
      };
    },
    methods: {
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications;
      },
      closeDropDown() {
        this.activeNotifications = false;
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      getPostsFromSearch() {
        eventBus.$emit('search', this.searchQuery);
        console.log(this.searchQuery)
      },
    },
};

</script>
<style>
#filterBar {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  margin-bottom: 10px;
}

.search-container {
  background: #fff;
  height: 40px;
  border-radius: 30px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.8s;
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .3),
    -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, .2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
}

.search-container:hover>.search-input,
.search-container>.search-input:focus { 
  width: 400px;
}

.search-container .search-input {
  background: transparent;
  border: none;
  outline: none;
  width: 0px;
  font-weight: 500;
  font-size: 16px;
  transition: 0.8s;

}

.search-container .search-btn .fas {
  color: #337ab7;
}
</style>
