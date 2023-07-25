<template>
  <card class="card-user" style="padding: 20px 20px 0px 20px;">
      <div class="row" style="padding: 5px 10px;">
          <img
          class="avatar border-white"
          src="@/assets/img/faces/face-2.jpg"
          alt="..."
        />
        <h6>
          b/{{ subreddit }}
          <a href="#">
            <small>&#2022 Posted by: @chetfaker</small>
          </a>
          <small>&nbsp {{ post_datetime }}</small>
        </h6>
      </div>
        <h4 class="title">
          {{ post_title }}
        </h4>
    <div>
      <p style="margin-top: 10px; max-height: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        {{ post_content }}
      </p>
      <div slot="image" class="card-image">
        <div id="post-content-home" v-html="postContentHome"></div>
      <!-- <img src="@/assets/img/background.jpg" alt="..." /> -->
      </div>
    </div>
    <hr />
    <div class="text-center">
      <div class="row">
        <h5>
            Comments
            <br />
            <small>{{ total_comments }}</small>
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
</template>
<script>
import axios from "axios";
export default {
  props: ['post_id', 'post_title', 'subreddit', 'post_url', 'post_datetime'],
  data() {
    return {
      total_comments: 0,
      post: null,
    }
  },
  created() {
    this.fetchPostData(); // Fetch individual post data
    this.fetchCommentsLength();
  },
  methods: {
    async fetchPostData() {
    try {
      const response = await axios.get('/posts/get/' + this.$route.params.id);
      this.post = response.data[0]; // Assuming the response is an array, you can modify this based on your server response

      console.log(this.post.post_url); 
      this.loadPostContent();
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  },
  loadPostContent: function() {
      // if post_url is an image link set postContent to an image tag with the url as the src
      if (this.post.post_url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        this.postContentHome = "<img src='" + this.post.post_url + "'></img>";
      }
      // else postContent will be a link to the post
      else {
        this.postContentHome = "<a href='" + this.post.post_url + "'>" + this.post.post_url + "</a>";
      }
      
    },
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-lg-3 offset-lg-1";
      } else if (remainder === 2) {
        return "col-lg-4";
      } else {
        return "col-lg-3";
      }
    },
    async fetchCommentsLength() {
      try {
        const response = await axios.get('/comments/get/' + this.post_id);
        this.total_comments = response.data.length;
      } catch (error) {
        console.error('Error fetching comments data:', error);
      }
    },
  },
};
</script>
<style></style>
