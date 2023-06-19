<template>
    <div style="padding: 20px 200px">
        <h3> This is the home page </h3>
        <Post-Card></Post-Card>
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