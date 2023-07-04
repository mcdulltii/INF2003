<template>
    <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-6">
        <user-card> </user-card>
        <members-card> </members-card>
      </div>
      <div class="col-xl-8 col-lg-7 col-md-6">
        <p> Posts: </p>
        <div>
          <post-card></post-card>
        </div>
      </div>
    </div>
  </template>
  <script>
  import UserCard from "./UserProfile/UserCard.vue";
  import MembersCard from "./UserProfile/MembersCard.vue";
  import PostCard from "./Posts/PostCard.vue";
  export default {
    components: {
      UserCard,
      MembersCard,
      PostCard
    },
  };
  </script>
  <style></style>
  