<template>
  <card class="card-user" v-if="!editMode">
    <drop-down v-if="true" no-caret
      style="list-style: none; display: inline-block; right: 35px; position: absolute"
      icon="ti-more-alt"
      class="nav-item ml-auto"
    >
      <a class="dropdown-item" style="margin-right: 60px;" v-on:click.prevent="enableEditMode">Edit Comment</a>
      <a class="dropdown-item" style="margin-right: 60px" v-on:click.prevent="deleteComment(comment._id)">Delete Comment</a>
    </drop-down>
    <div class="user-info">
      <img class="avatar-comments border-white" src="@/assets/img/faces/face-2.jpg" alt="..." />
      <h6 class="title">u/hellouser1 <small>&nbsp;5 days ago</small></h6>
    </div>
    <div>
      <p>{{ comment.comment_message }}</p>
    </div>
    <hr />
  </card>

  <card class="card-user" v-else>
    <div class="user-info">
      <img class="avatar-comments border-white" src="@/assets/img/faces/face-2.jpg" alt="..." />
      <h6 class="title">u/hellouser1 <small>&nbsp;5 days ago</small></h6>
    </div>
    <div>
      <textarea v-model="editedComment" rows="3"></textarea>
    </div>
    <hr />
    <div class="text-center">
      <button @click="saveChanges">Save Changes</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </card>
</template>

<script>
import axios from "axios";

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editMode: false,
      editedComment: "",
      commentData: [],
      pageCount: 10,
      current_page: 0,
    };
  },
  mounted() {
    this.reloadComments(this.current_page);
  },
  methods: {
    enableEditMode() {
      this.editMode = true;
      this.editedComment = this.comment.comment_message;
    },
    saveChanges: function (id) {
      // get values from inputs
      var post_id = this.comment.post_id;
      var comment_message = this.editedComment;

            // create new comment object
            var updatedComment = {
                post_id: post_id,
                comment_message: comment_message
            };

            // call api to update comment
            fetch('/comments/update/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedComment)
            })
                .then(response => response.json())
                .catch(error => {
                    console.log(error);
                });

            this.editMode = false;

            // call api to get new comment and update table
            this.reloadComments(this.current_page);
      
      // You can also send the edited comment to the server here using an API call.
      // For simplicity, I'm not including the API call in this example.
    },
    cancelEdit() {
      this.editMode = false;
      this.editedComment = "";
    },
      onDeleteClick: function (id) {
            console.log(id);
            if (confirm('Are you sure you want to delete this comment?')) {
                // call api to delete comment
                fetch('/comments/delete/' + id, {method: 'POST'})
                    .then(response => response.json())
                    .catch(error => {
                        console.log(error);
                    });

                // call api to get new comments and update table
                this.reloadComments(this.current_page);
            }
        },
        deleteComment: function (id) {
          console.log(id);
          if (confirm('Are you sure you want to delete this post?')) {
              // call api to delete post
              fetch('/comments/delete/' + id, {method: 'POST'})
                  .then(response => response.json())
                  .catch(error => {
                      console.log(error);
                  });

              // call api to get new posts and update table
              this.$router.push('/indivpost/' + this.comment.post_id)
          }
      },
      reloadComments: function (page) {
            // if current_search_key and current_search_value are not null, then get comments by search
            // else get all comments
            if (this.current_search_key !== null && this.current_search_value !== null) {
                this.searchComments(this.current_search_key, this.current_search_value, page);
            } else {
                fetch('/comments/' + page)
                    .then(response => response.json())
                    .then(data => {
                        this.commentData = data.comments;
                        // remove _v from tableData
                        this.commentData.forEach(item => delete item.__v);
                        this.pageCount = data.num_pages;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
  },
};
</script>

<style>
.user-info {
  display: flex;
  align-items: left;
  margin: 10px;
}

/* .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
} */

.title {
  margin: 0;
}

.text-center {
  text-align: center;
  margin: 10px;
}
</style>
