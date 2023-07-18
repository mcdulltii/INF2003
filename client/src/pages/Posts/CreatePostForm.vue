<template>
  <card class="card" title="Create Post">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Subbludit"
              placeholder="all"
              id = "create-post-subreddit-input"
              v-model="post.subreddit"
            >
            </fg-input>
          </div>
          <div class="col-md-8">
            <fg-input
              type="text"
              label="Title"
              placeholder="Give your post an interesting title"
              v-model="post.post_title"
              id = "create-post-title-input"
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
                placeholder="Here can be your description"
                v-model="post.post_content"
                id = "create-post-content-input"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="text-right">
          <p-button type="info" id="create-post-button" round v-on:click="onCreateClick(current_id)">
            Post
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      post: {
        subreddit: '',
        post_title: '',
        post_content: ''
      }
    };
  },
  methods: {
    onCreateClick: function (id) {
            // if current_id is null, then we are adding a new post
            if (id === null) {
                this.addPost();
            } else {
                this.updatePost(id);
            }
        },
        addPost: function() {
            // get new values from inputs and trim whitespace
            var new_post_title = document.getElementById('post-title-input').value.trim();

            // call api to add post
            fetch('/posts/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        post_title: new_post_title,
                    })
                })
                .then(response => response.json())
                .catch(error => {
                    console.log(error);
                });

            // call api to get new posts and update table
            this.reloadTable(this.current_page);

            this.clearInputs();
        },
        updatePost: function (id) {
            // get new values from inputs
            var new_post_title = document.getElementById('post-title-input').value;
          

            // call api to update post
            fetch('/posts/update/' + id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        post_title: new_post_title,
                    })
                })
                .then(response => response.json())
                .catch(error => {
                    console.log(error);
                });

            // call api to get new posts and update table
            this.reloadTable(this.current_page);
        },
  }
};
</script>
