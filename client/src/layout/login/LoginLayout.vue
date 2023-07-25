<template>
    <div class="wrapper">
      <div class="content">
        
        <top-navbar></top-navbar>
        <home-content> </home-content>
  
        <content-footer></content-footer>
      </div>
  
    </div>
      
  </template>
  <style lang="scss">
body {
  background-image: url("https://i.pinimg.com/originals/66/19/80/661980c1f6ed5448d6825d5920048bbb.gif");
  background-repeat:no-repeat;
  background-position: center center;
  min-height:100%;
  background-size: 100% 100% ;
  background-color: #176776;
}
</style>
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
  