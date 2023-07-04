<template>
    <div style="padding: 20px 200px">
        <h3> This is the individual post </h3>
        <Indiv-Post-Card></Indiv-Post-Card>
        <Comments></Comments>
    </div>
</template>
<script>
  import IndivPostCard from "./Posts/IndivPostCard.vue";
  import Comments from "./Posts/Comments.vue";
  export default {
    components: {
      IndivPostCard,
      Comments
    },
  };
  </script>