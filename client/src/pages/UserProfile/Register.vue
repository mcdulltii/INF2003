<template>
  <div style="width: 50%; margin: auto">
    <card class="card" title="Register" style="align-items: center; margin-top: 20%; padding: auto"> 
      <div>
        <form @submit.prevent="registerUser">
          <div class="row">
            <div class="col-md-20">
              <fg-input
                type="text"
                label="Username"
                placeholder="Username"
                id="create-username"
                v-model="user.username"
              >
              </fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-20">
              <fg-input
                type="password"
                label="Password"
                placeholder="Password"
                id="create-password"
                v-model="user.password"
              >
              </fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-20">
              <fg-input
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                id="confirm-password"
                v-model="user.confirmPassword"
              >
              </fg-input>
            </div>
          </div>
          <div class="text-center">
            <button type="submit">
              Register
            </button>
            <p style="padding-top: 20px"></p>
            <p v-if="error" class="error">{{ error }}</p>
            <router-link :to="{ path: '/login' }">
              <p style="text-decoration: underline;"> Already on Bludit? Log in </p>
            </router-link>
          </div>
          <div class="clearfix"> </div>
        </form>
      </div>
    </card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      },
      error: '',
    };
  },
  methods: {
    async registerUser() {
      // get new values from inputs and trim whitespace
      var new_username = this.user.username.trim();
      var new_password = this.user.password.trim();
      var confirm_password = this.user.confirmPassword.trim();
      if (new_password != confirm_password) {
        this.error = 'Passwords do not match';
        return;
      }
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(new_password);
      const hash = await crypto.subtle.digest('SHA-256', encodedData);
      const hashArray = Array.from(new Uint8Array(hash));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      var hash_password = hashHex;
      console.log("my registered hash:" + hash_password);

      // call api to add post
      fetch('/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: new_username,
          password: hash_password,
        }),
      })
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
          this.error = 'Failed to register user';
          return -1;
        }
      })
      .then(response => {
        if (response == -1)
          this.$router.push('');
        else
          // Redirect to the login page after successful registration
          this.$router.push('/login');
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
};
</script>

<style>
</style>