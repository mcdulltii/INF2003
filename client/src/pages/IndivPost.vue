<template>
    <div style="padding: 50px 200px">
      <card v-if="post" class="card-user" style="margin-top: 40px; padding: 20px 20px 0px 20px;">
        <div class="row" style="margin-left: 20px; transform: scale(0.70); margin-left: calc((0.5 - 1) * 390px); margin-top: calc((0.5 - 1) * 100px); margin-bottom: calc((0.5 - 1) * 120px);">
            <img
            class="avatar border-white"
            src="@/assets/img/faces/face-2.jpg"
            alt="..."
            style="transform: scale(0.5);"
          />
          <h4 class="title" style="margin-left: calc((0.5 - 1) *30px);">
            r/{{ post.subreddit }}
            <a href="#">
              <small>&#2022 Posted by: @chetfaker</small>
            </a>
            <small id="post-datetime">{{ post.post_datetime }}</small>
          </h4>
        </div>
          <h4 class="title" id="post-title">
            {{ post.post_title }}
          </h4>
      <div >
        <p>
          {{ post.post_content }}
        </p>
        <div slot="image">
        <img src="@/assets/img/background.jpg" alt="..." />
      </div>
      </div>
      <hr />
      <div class="text-center">
        <div class="row">
          <h5>
              Comments
              <br />
              <small>57</small>
            </h5>
            <h5>
              Share
              <br />
              <small> -></small>
            </h5>
            <h5>
              Save
              <br />
              <small>V</small>
            </h5>
        </div>
      </div>
    </card>
        <Comments></Comments>
    </div>
</template>
<script>
  import axios from "axios";
  import IndivPostCard from "./Posts/IndivPostCard.vue";
  import Comments from "./Posts/Comments.vue";
  export default {
  data() {
    return {
      post: null,
      id: this.$route.params.id,
    };
  },
  created() {
    this.fetchPostData();
  },
  methods: {
    async fetchPostData() {
      try {
        const response = await axios.get('/posts/get/' + this.$route.params.id);
        this.post = response.data[0]; // Assuming the response is an array, you can modify this based on your server response
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    },
  },
};
  </script>