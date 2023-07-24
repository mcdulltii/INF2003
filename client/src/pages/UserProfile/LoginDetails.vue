<template>
  <div style="width: 50%; margin: auto">
    <card class="card" title="Login" style="align-items: center; margin-top: 20%; padding: auto"> 
      <div>
        <form>
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
            <button type="submit" round @click.native.prevent="login">
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
import axios from 'axios';

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
    login: function() {
      console.log('wank');
      axios
        .post('/users/login', {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if (response.status == 200) {
            // Login successful
            this.success = 'Success!';
            // Redirect to the home page
            this.$router.push('/');
            alert("Welcome back," + this.username);
          } else {
            this.error = 'Username or Password do not match';
            return;
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = 'Login failed.';
          return;
        });
    },
  },
};
</script>
<style></style>
