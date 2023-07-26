<template>
  <card class="card" title="Edit Profile">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3">
            <fg-input
              type="text"
              label="Username"
              placeholder="Username"
              v-model="user.username"
            required>
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input
              type="text"
              label="First Name"
              placeholder="First Name"
              v-model="user.password"
            required>
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Last Name"
              placeholder="Last Name"
              v-model="user.confirmPassword"
            required>
            </fg-input>
          </div>
        </div>
        <label>{{error}}</label>
        <label>{{success}}</label>
        <div class="text-center">
          <p-button type="info" round @click.native.prevent="updateProfile">
            Update Profile
          </p-button>
        </div>
        <div class="text-center">
          <p-button type="danger" round @click.native.prevent="deleteProfile">
            Delete User
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        company: "Paper Dashboard",
        username: "",
        password: "",
        confirmPassword: "",
        error: "",
        success: "",
      },
    };
  },
  methods: {
    updateProfile() {
      // get new values from inputs and trim whitespace
      var new_username = this.user.username.trim();
      var new_password = this.user.password.trim();
      var confirm_password = this.user.confirmPassword.trim();
      var edit_user_id = localStorage.getItem('user_id');
      console.log("edit_user_id: " + edit_user_id);
      console.log("new_username: " + new_username);
      console.log("new_password: " + new_password);
      
      if (new_password != confirm_password) {
        this.error = 'Passwords do not match';
        return;
      }
      fetch('/users/update/' + edit_user_id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: new_username,
          password: new_password,
          id: edit_user_id,
        }),
      })
      .then(response => {
        if (response.status == 200) {
          this.success = "Profile updated successfully";
          return response.json();
        } else {
          this.error = 'Failed to update profile';
          return -1;
        }
      })
      .catch(error => {
        console.log(error);
      });
    },

    deleteProfile() {
      // get new values from inputs and trim whitespace
      var delete_user_id = localStorage.getItem('user_id');
      
      fetch('/users/delete/' + delete_user_id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: delete_user_id,
        }),
      })
      .then(response => {
        if (response.status == 200) {
          this.success = "User deleted successfully"
          return response.json();
        } else {
          this.error = 'Failed to delete user';
          return -1;
        }
      })
      .then(response => {
        if (response == -1)
          this.$router.push('');
        else {
          localStorage.removeItem('user_id');
          // Update the loggedIn data property to false
          localStorage.setItem('loggedIn', false);
          this.$router.push('/');
    }})
      .catch(error => {
        console.log(error);
      });
    },
  },
};
</script>
<style></style>
