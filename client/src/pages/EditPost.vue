<template>
    <div class="row" style="margin: auto">
        
      <div class="col-xl-9 col-lg-8 col-md-7" style="margin: auto">
        <create-post-form> </create-post-form>
      </div>
    </div>
  </template>
  <script>
  import CreatePostForm from "./Posts/CreatePostForm.vue";
  export default {
    components: {
      CreatePostForm,
    },
  };
  </script>
  <style></style>
  