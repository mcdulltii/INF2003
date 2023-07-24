<template>
  <div class="container-fluid" style="padding: 80px 200px">
    <card v-if="post" class="card-user" style="display: flex; margin-top: 40px; padding: 20px 20px 0px 20px;">
      <drop-down v-if="true" no-caret
          style="list-style: none; display: inline-block; right: 35px; position: absolute"
          icon="ti-more-alt"
          class="nav-item ml-auto"
        >
          <a class="dropdown-item" style="margin-right: 60px;" v-on:click.prevent="editPost(post.post_id)" href="/">Edit Post</a>
          <a class="dropdown-item" style="margin-right: 60px" v-on:click.prevent="deletePost(post.post_id)" href="/">Delete Post</a>
        </drop-down>
      <div class="row">
          <img
          class="avatar border-white"
          src="@/assets/img/faces/face-2.jpg"
          alt="..."
        />
        <h6>
          r/{{ post.subreddit }}
          <a href="#">
            <small>&#2022 Posted by: @chetfaker</small>
          </a>
          <small id="post-datetime">{{ post.post_datetime }}</small>
        </h6>
        
      </div>
        <h4 class="title" id="post-title">
          {{ post.post_title }}
        </h4>
    <div style="margin-top: 15px">
      <p>
        {{ post.post_content }}
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
  <p> Comments: </p>
  <card class="card-user" style="display: flex; flex-direction: column;">
    <small> Comment as u/helloUser1 </small>
    <div style="flex: 1;">
      <textarea v-model="newComment" rows="2" placeholder="What are your thoughts?"></textarea>
      <div class="text-right">
      <button style="right: 20px; bottom: 18px; position: absolute" @click="saveChanges">Post</button>
    </div>
    </div>
    <hr />
    
  </card>
  <div v-for="comment in comments" :key="comment._id">
    <Comments :comment="comment"></Comments>
  </div>
  </div>
</template>
<script>
import axios from "axios";
import Comments from "../Posts/Comments.vue";
export default {
data() {
  return {
    comments: [],
    post: null,
    id: this.$route.params.id,
    newComment: "",
  };
},
created() {
  this.fetchPostData(); // Fetch individual post data
  this.fetchCommentsData(); // Fetch comments data
},
// mounted () {
//     this.reloadComments();
//   },
methods: {
  async fetchPostData() {
    try {
      const response = await axios.get('/posts/get/' + this.$route.params.id);
      this.post = response.data[0]; // Assuming the response is an array, you can modify this based on your server response
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  },
  async fetchCommentsData() {
    try {
      const response = await axios.get('/comments/get/' + this.$route.params.id);
      this.comments = response.data; // Assuming the response is an object with a 'comments' property containing the comments array
    } catch (error) {
      console.error('Error fetching comments data:', error);
    }
  },
  saveChanges: function() {

  },
  editPost: function(id) {
    this.$router.push('/indivpost/edit/' + id)
  },
  deletePost: function (id) {
          console.log(id);
          if (confirm('Are you sure you want to delete this post?')) {
              // call api to delete post
              fetch('/posts/delete/' + id, {method: 'POST'})
                  .then(response => response.json())
                  .catch(error => {
                      console.log(error);
                  });

              // call api to get new posts and update table
              this.$router.push('/')
          }
      },
      reloadComments: function () {
          fetch('/comments/get/' + this.$route.params.id)
              .then(response => response.json())
              .then(data => {
                  this.comments = data.comments;
                  // remove _v from tableData
                  // this.comments.forEach(item => delete item.__v);
              })
              .catch(error => {
                  console.log(error);
              });
      },
},
components: {
    Comments
  },
};
</script>