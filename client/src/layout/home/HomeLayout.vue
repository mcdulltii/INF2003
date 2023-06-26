<template>
  <div class="wrapper">
    <div class="content">
      
      <top-navbar></top-navbar>
      <div style="padding: 100px 250px">
      <home-content> </home-content>
      </div>
      <content-footer></content-footer>
    </div>

  </div>
    
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./MainNavbar.vue";
import ContentFooter from "../dashboard/ContentFooter.vue";
import HomeContent from "./Content.vue";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    HomeContent
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
