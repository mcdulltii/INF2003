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
<style lang="scss">
body {
  background-image: url("https://i.pinimg.com/originals/34/d7/a3/34d7a3bbe7ab056f213e66c7182dd57e.gif");
  background-repeat:no-repeat;
  background-position: center center;
  min-height:100%;
  background-size: 100% 100% ;
  background-color: #80B2D0;
}
</style>
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
