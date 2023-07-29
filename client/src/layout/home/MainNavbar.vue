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
        <input type="text" class="form-control" id="filterBar" v-on:keyup="updateFilteredSubbludits" v-model="filterQuery" @click.stop placeholder="Filter...">
        <!-- relevant to search/filter functions, click event to trigger filter is here -->
        <a class="dropdown-item" style="padding: 10px 45px 10px 15px; margin-bottom: 5px;" href="#"><span @click="getPostsSortedByComments" class="ti-stats-up"> Trending </span></a>
        <!-- Display the filteredSubreddits based on user input -->
        <a v-for="subbludit in filteredSubbludits" :key="subbludit" class="dropdown-item subreddit-option" href="#">
          <router-link :to="{ path: '/subbludit/' + subbludit.name }"> b/ {{ subbludit.name }} </router-link>
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
            <drop-down v-if="true" class="nav-item" title="User Details" title-classes="nav-link" icon="ti-face-smile">
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

// Added a post count to the user profile here so that it can be refreshed dynamically.
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
      loggedIn: localStorage.getItem('loggedIn'),
      activeNotifications: false,
      user_name: localStorage.getItem('username'),
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
    logout() {
      localStorage.removeItem('user_id');
      // Update the loggedIn data property to false
      this.loggedIn = false;
      localStorage.setItem('loggedIn', false);
      // Redirect the user to the login page or any other desired page
      this.$router.push('/');
    },
    getPostsSortedByComments() {
      // alert("function is called");
      eventBus.$emit('posts-sorted-by-comments');
    },
    getPostCount() {
      var get_user_id = localStorage.getItem('user_id');
      console.log(get_user_id)
      // call api to add post
      fetch('/user/posts/' + get_user_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: get_user_id,
        }),
      })
        .then(response => {
          response = response.json()
          response.then(function (res) {
            return new Promise((result) => {
              localStorage.setItem('post_count', res.num_posts);
            })

          })
        })
        .catch(error => {
          console.log(error);
        });
    },
    async updateFilteredSubbludits() {
      const query = this.filterQuery.toLowerCase();

      // Make a request to your API endpoint for searching subreddits
      try {
        const response = await axios.get('/subreddit/search/' + query);
        const apiResponse = response.data;
        const subredditsFromAPI = apiResponse.success ? apiResponse.subreddits : [];

        // Update the filteredSubbludits with the retrieved subreddits
        this.filteredSubbludits = subredditsFromAPI.map(subbludit => ({ _id: subbludit.forum_name, name: subbludit.forum_name }));
      } catch (error) {
        console.error('Error fetching subreddits:', error);
        this.filteredSubbludits = []; // Clear the list if an error occurs
      }
    },
  },
  beforeMount() {
    this.getPostCount()
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
