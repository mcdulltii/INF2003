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
    <div class="user-info" style="transform-origin: top left;">
      <img class="avatar border-white" src="@/assets/img/faces/face-2.jpg" alt="..." />
      <h4 class="title">u/hellouser1 <small>&nbsp;5 days ago</small></h4>
    </div>
    <div>
      <p>{{ comment.comment_message }}</p>
    </div>
    <hr />
  </card>

  <card class="card-user" v-else>
    <div class="user-info">
      <img class="avatar border-white" src="@/assets/img/faces/face-2.jpg" alt="..." />
      <h4 class="title">u/hellouser1 <small>&nbsp;5 days ago</small></h4>
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
    };
  },
  methods: {
    enableEditMode() {
      this.editMode = true;
      this.editedComment = this.comment.comment_message;
    },
    saveChanges() {
      this.comment.comment_message = this.editedComment;
      this.editMode = false;
      // You can also send the edited comment to the server here using an API call.
      // For simplicity, I'm not including the API call in this example.
    },
    cancelEdit() {
      this.editMode = false;
      this.editedComment = "";
    },
    deleteComment(comment_id) {
      // Implement the delete comment function here
      // For example, you can make an API call to delete the comment from the server
      axios.delete(`/api/comments/${comment_id}`)
        .then(() => {
          // If the delete request is successful, you can remove the comment from the UI or take any other appropriate action.
          // For this example, I'm just logging a message.
          console.log("Comment deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting comment:", error);
        });
    },
  },
};
</script>

<style>
.user-info {
  display: flex;
  align-items: center;
  margin: 10px;
  transform: scale(0.6);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.title {
  margin: 0;
}

.text-center {
  text-align: center;
  margin: 10px;
}
</style>
