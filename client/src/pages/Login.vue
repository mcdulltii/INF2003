<template>
    <div class="row" style="margin-top: 15px;">
      <!-- <div class="col-xl-4 col-lg-5 col-md-6">
      </div> -->
      <div class="col-xl-8 col-lg-7 col-md-6" style="margin: auto">
        <login-details> </login-details>
      </div>
    </div>
  </template>
  <script>
  import LoginDetails from "./UserProfile/LoginDetails.vue";
  export default {
    components: {
      LoginDetails,
    },
  };
  </script>
  <style></style>
  