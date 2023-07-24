<template>
  <card class="card-user" style="padding: 20px 20px 0px 20px;">
      <div class="row" style="margin-left: 20px; transform: scale(0.70); margin-left: calc((0.5 - 1) * 390px); margin-top: calc((0.5 - 1) * 100px); margin-bottom: calc((0.5 - 1) * 120px);">
          <img
          class="avatar border-white"
          src="@/assets/img/faces/face-2.jpg"
          alt="..."
          style="transform: scale(0.5); transform-origin: top left;"
        />
        <h4 class="title" style="margin-left: calc((0.5 - 1) *30px);">
          r/{{ subreddit }}
          <a href="#">
            <small>&#2022 Posted by: @chetfaker</small>
          </a>
          <small>&nbsp {{ post_datetime }}</small>
        </h4>
      </div>
        <h4 class="title">
          {{ post_title }}
        </h4>
    <div style="padding: 20px 0px">
      <p style="max-height: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        {{ post_url }}
      </p>
      <div slot="image">
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
    }
  },
  created() {
    this.fetchCommentsLength();
  },
  methods: {
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
