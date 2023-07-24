<template>
  <div class="container-fluid" style="padding: 100px 200px">
    <div class="row" style="margin: auto">
        
        <div class="col-xl-9 col-lg-8 col-md-7" style="margin: auto">
          <card class="card" title="Edit Post">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Subbludit"
              :placeholder="post.subreddit"
              id = "edit-post-subreddit-input"
              v-model="post.subreddit"
            >
            </fg-input>
          </div>
          <div class="col-md-8">
            <fg-input
              type="text"
              label="Title"
              v-model="post.post_title"
              id = "edit-post-title-input"
            >
            </fg-input>
          </div>
        </div>  
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Content</label>
              <textarea
                rows="5"
                class="form-control border-input"
                v-model="post.post_content"
                id = "edit-post-content-input"
              >
            </textarea>
            </div>
          </div>
        </div>
        <div class="text-right">
          <p-button type="info" round @click.native.prevent="onCreateClick(createdPostID)">Save Post</p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
        </div>
      </div>
    </div>
  </template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      createdPostID: this.$route.params.id,
      post: {
        subreddit: '',
        post_title: '',
        post_content: ''
      }
    };
  },
  async created() {
    // Fetch the post data when the component is created
    await this.fetchPostData();
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
    onCreateClick: function (id) {
            // if current_id is null, then we are adding a new post
            var new_post_subreddit = document.getElementById('edit-post-subreddit-input').value.trim();
            var new_post_title = document.getElementById('edit-post-title-input').value.trim();
            var new_post_content = document.getElementById('edit-post-content-input').value.trim();
          

          // call api to update post
          fetch('/posts/update/' + id, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                        post_subreddit: new_post_subreddit,
                        post_title: new_post_title,
                        post_content: new_post_content,
                        post_datetime: null
                  })
              })
              .then(response => response.json()
                )
                .then(data => {this.$router.push('/indivpost/' + data.post_id)})
                // .then(this.$router.push('/indivpost/' + createdPostID))
                .catch(error => {
                    console.log(error);
                });

          // call api to get new posts and update table
          this.reloadTable(this.current_page);
  }
}
};
</script>

  <style></style>
  