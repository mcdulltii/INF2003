<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="position: fixed; top: 0; width: 100%; z-index: 999">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"> BLUDIT </a>
      <drop-down v-if="$route.path === '/'"
        class="navbar-brand"
        title="Home"
        title-classes="nav-link"
        icon="ti-home"
      >
        <input type="text" id="filterBar" @input="updateFilteredSubreddits" v-model="filterQuery" @click.stop placeholder="Filter...">
        <!-- relevant to search/filter functions, click event to trigger filter is here -->
        <a class="dropdown-item icon-container" @click="getPostsSortedByComments" style="padding: 10px 45px 10px 15px;" href="#"><span class="ti-stats-up"></span></a>
        <!-- Display the filteredSubreddits based on user input -->
        <a v-for="subbludit in filteredSubbludits" :key="subbludit" class="dropdown-item subreddit-option" href="#">
          b/ {{ subbludit.name }}
        </a>
      </drop-down>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a v-if="true" href="#/login" class="nav-link">
              <i class="ti-face-smile"></i>
              <p>Login/Register</p>
            </a>
          </li>
          <li class="nav-item" v-show="loggedIn">
            <drop-down v-if="true"
            class="nav-item"
            title="Username"
            title-classes="nav-link"
            icon="ti-face-smile"
          >
          <li class="nav-item" v-show="loggedIn">
            <a v-if="true" class="nav-link" @click="logout">
              <i class="ti-face-smile"></i>
              <p>Logout</p>
            </a>
          </li>
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
      // default options
      filteredSubbludits: [
        { _id: '1', name: 'art' },
        { _id: '2', name: 'artificial' },
        { _id: '3', name: 'datascience' },
      ],
    };
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    filteredItems() {
    const query = this.filterQuery.toLowerCase();
    return this.items.filter(item => item.toLowerCase().includes(query));
    },
    // async updateFilteredSubreddits() {
    //   const query = this.filterQuery.toLowerCase();
    //   try {
    //     const response = await axios.get('/api/topSubreddits', {
    //       params: { searchQuery: query },
    //     });
    //     this.filteredSubreddits = response.data.subreddits;
    //   } catch (error) {
    //     console.error('Error fetching top subreddits:', error);
    //     this.filteredSubreddits = [];
    //   }
    // },
    // // Update filteredSubreddits to fetch top 3 subreddits based on post count
    // async filteredSubreddits() {
    //   const query = this.filterQuery.toLowerCase();
    //   try {
    //     const response = await axios.get('/api/topSubreddits', {
    //       params: { searchQuery: query },
    //     });
    //     return response.data.subreddits;
    //   } catch (error) {
    //     console.error('Error fetching top subreddits:', error);
    //     return [];
    //   }
    // },
  },
  created() {
    // Retrieve the 'loggedIn' value from local storage during component initialization
    this.loggedIn = localStorage.getItem('loggedIn');
    console.log(this.loggedIn);
    console.log(loggedIn);
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
    // relevant to search/filter functions
    getPostsSortedByComments() {
      // alert("function is called");
      eventBus.$emit('posts-sorted-by-comments');
    },
    logout() {
    localStorage.removeItem('user_id');
    // Update the loggedIn data property to false
    this.loggedIn = false;
    // Redirect the user to the login page or any other desired page
    this.$router.push('/');
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
</style>
