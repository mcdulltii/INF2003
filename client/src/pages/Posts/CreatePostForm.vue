<template>
  <card class="card" title="Create Post">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-4">
            <select  class="dropdown" v-model="post.subreddit" >
              <option selected disabled>Choose a subreddit</option>
              <option v-for="code in availiableSubReddits" v-bind:value="code">{{ code }}</option>
         </select>
       
          </div>
          <div class="col-md-8">
            <fg-input type="text" label="Title" placeholder="Give your post an interesting title"
              v-model="post.post_title" id="create-post-title-input">
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Content</label>
              <textarea rows="5" class="form-control border-input" placeholder="Here can be your description"
                v-model="post.post_content" id="create-post-content-input"></textarea>
            </div>
          </div>
        </div>
        <div class="text-right">
          <p-button type="info" round @click.native.prevent="onCreateClick(createdPostID)">Create Post</p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
// created a dropdown list for user to select sub-reddits
export default {
  data() {
    return {
      createdPostID: null,
      post: {
        subreddit: '',
        post_title: '',
        post_content: ''
      },
      availiableSubReddits: ['MachineLearning', 'artificial', 'datascience'],

    };
  },
  methods: {
    initAvailSubreddits() {
      fetch('/subreddit/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response = response.json()
        response.then(function (res) {
          return new Promise((result) => {
            return res.forums;
          })

        })
      })
        .catch(error => {
          console.log(error);
        });
    },
    onCreateClick: function (id) {
      // if current_id is null, then we are adding a new post
      if (id === null) {
        this.addPost();
      } else {
        this.updatePost(id);
      }
    },
    addPost: function () {

      // get new values from inputs and trim whitespace
      
      var new_post_title = document.getElementById('create-post-title-input').value.trim();
      var new_post_content = document.getElementById('create-post-content-input').value.trim();
      // call api to add post
      fetch('/posts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post_subreddit: this.post.subreddit,
          post_title: new_post_title,
          post_content: new_post_content,
          post_datetime: null,
          post_user_id: localStorage.getItem('user_id')
        }),
      })
        .then(response => response.json()
        )
        .then(data => { this.$router.push('/indivpost/' + data.post_id) })
        // .then(this.$router.push('/indivpost/' + createdPostID))
        .catch(error => {
          console.log(error);
        });

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