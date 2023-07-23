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
            <p-button type="info" round @click.native.prevent="login()">
              Login
            </p-button>
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
import axios from 'axios'
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

    validate: function()
    {
        if (this.username == '')
        {
            this.error = 'Please enter your username.';
            return false;
        }
        if (this.password == '')
        {
            this.error = 'Please enter your password.';
            return false;
        }
        this.valid = true;
    },

    login : function(){
      this.validate();
      if(this.valid = false)
      {
        return;
      }
      console.log('wank');
      axios
      .post('/users/login', {
                      username: this.username,
                      password: this.password,
                })
              .then(response => response.json()
                )
              .then((response) => {
                // Login successful
                this.success = 'Success!';
                // Redirect to the home page
                this.$router.push('/');
                const message = `<div style="font-size: 18px; color: #007bff;">Welcome back, <span style="font-weight: bold;">${this.username}</span></div>`;
                alert(message);
              })
              .catch(error => {
                  console.log(error);
                  this.error = error.response.data.error || 'Login failed.';
              });
                
        },
      }
    }
</script>
<style></style>
