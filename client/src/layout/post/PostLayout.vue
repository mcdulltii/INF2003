<template>
    <div class="wrapper">
      <div class="content">
        
        <top-navbar></top-navbar>
        <home-content> </home-content>
  
        <content-footer></content-footer>
      </div>
  
    </div>
      
  </template>
  <style lang="scss"></style>
  <script>
  import TopNavbar from "../home/MainNavbar.vue";
  import ContentFooter from "../dashboard/ContentFooter.vue";
  import HomeContent from "../home/Content.vue";
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      HomeContent
    },
  };
  </script>
  