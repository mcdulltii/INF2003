<template>
  <div style="width: 50%; margin: auto">
    <card class="card" title="Login" style="align-items: center; margin-top: 20%; padding: auto"> 
      <div>
        <form @submit.prevent="login">
          <div class="row">
            <div class="col-md-20">
              <fg-input
                type="text"
                label="Username"
                placeholder="Username"
                v-model="username"
              required>
              </fg-input>
            </div>
          </div>
  
          <div class="row">
            <div class="col-md-20">
              <fg-input
                type="password"
                label="Password"
                placeholder="Password"
                v-model="password"
              required>
              </fg-input>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" round>
              Login
            </button>
            <p style="padding-top: 20px"></p>
            <label>{{error}}</label>
            <router-link :to="{ path: '/register' }">
              <p style="text-decoration: underline;"> New to Bludit? Register now</p>
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
      username: '',
      password: '',
      error: '',
      success: '',
    };
  },
  methods: {
    login() {
      // get new values from inputs and trim whitespace
      var login_username = this.username.trim();
      var login_password = this.password.trim();
      // call api to add post
      fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: login_username,
          password: login_password,
        }),
      })
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
          this.error = 'Username or Password do not match';
          return -1;
        }
      })
      .then(response => {
        if (response == -1)
          this.$router.push('');
        else
          // Redirect to the home page after successful login
          this.$router.push('/');
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
}
</script>
<style></style>
