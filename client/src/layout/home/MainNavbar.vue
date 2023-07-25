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
        <input type="text" id="filterBar" @input="updateFilteredSubreddits" v-model="filterQuery" placeholder="Filter...">
        <!-- Display the filteredSubreddits based on user input -->
        <a v-for="subreddit in filteredSubreddits" :key="subreddit" class="dropdown-item subreddit-option" href="#">
          {{ subreddit }}
        </a>
      </drop-down>
      <button
        class="navbar-toggler navbar-burger"
        type="button"
        @click="toggleSidebar"
        :aria-expanded="$sidebar.showSidebar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <!-- <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-panel"></i>
              <p>Stats</p>
            </a>
          </li> -->
          <li class="nav-item">
            <a v-if="true" href="#/login" class="nav-link">
              <i class="ti-face-smile"></i>
              <p>Login/Register</p>
            </a>
          </li>
          <li class="nav-item">
            <drop-down v-if="true"
            class="nav-item"
            title="Username"
            title-classes="nav-link"
            icon="ti-face-smile"
          >
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

export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    filteredItems() {
    const query = this.filterQuery.toLowerCase();
    return this.items.filter(item => item.toLowerCase().includes(query));
    },
    // filteredSubreddits() {
    //   const query = this.filterQuery.toLowerCase();
    //   return this.popularSubreddits.filter(subreddit => subreddit.toLowerCase().includes(query));
    // },
    async updateFilteredSubreddits() {
      const query = this.filterQuery.toLowerCase();
      try {
        const response = await axios.get('/api/topSubreddits', {
          params: { searchQuery: query },
        });
        this.filteredSubreddits = response.data.subreddits;
      } catch (error) {
        console.error('Error fetching top subreddits:', error);
        this.filteredSubreddits = [];
      }
    },
    // Update filteredSubreddits to fetch top 3 subreddits based on post count
    async filteredSubreddits() {
      const query = this.filterQuery.toLowerCase();
      try {
        const response = await axios.get('/api/topSubreddits', {
          params: { searchQuery: query },
        });
        return response.data.subreddits;
      } catch (error) {
        console.error('Error fetching top subreddits:', error);
        return [];
      }
    },
  },
  data() {
    return {
      activeNotifications: false,
      filterQuery: "",
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
