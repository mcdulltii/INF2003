<template>
  
  <div>
      <card style="height: 60px; margin-bottom:25px">
          <div class="row" style="margin-left: 30%">
            <img
            class="avatar border-white"
            src="@/assets/img/faces/face-2.jpg"
            alt="..."
            style="transform: scale(0.65);margin-top: calc((0.5 - 1) * 30px);margin-bottom: calc((0.5 - 1) * 20px);"
          />
          <router-link :to="{ path: '/createpost' }">
            <textarea style="width: 150%">Create Post</textarea>
          </router-link>
          </div>
        </card>
        <router-link :to="{ path: '/indivpost' }">
        <Post-Card></Post-Card>
        <Post-Card></Post-Card>
        </router-link>
    </div>
</template>
<script>
  import PostCard from "./Posts/PostCard.vue";
  export default {
    components: {
      PostCard,
    },
  };
  </script>