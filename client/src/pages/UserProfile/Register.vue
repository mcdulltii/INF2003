<template>
    <div style="width: 50%; margin: auto">
      <card class="card" title="Register" style="align-items: center; margin-top: 20%; padding: auto"> 
        <div>
          <form @submit.prevent>
            <div class="row">
              <div class="col-md-12">
                <fg-input
                  type="text"
                  label="Email"
                  placeholder="Email"
                  v-model="user.username"
                >
                </fg-input>
              </div>
            </div>
    
            <div class="row">
                <div class="col-md-20">
                <fg-input
                  type="text"
                  label="Username"
                  placeholder="Username"
                  v-model="user.username"
                >
                </fg-input>
              </div>
              <div class="col-md-20">
                <fg-input
                  type="text"
                  label="Password"
                  placeholder="Password"
                  v-model="user.password"
                >
                </fg-input>
              </div>
            </div>
            <div class="text-center">
              <p-button type="info" round @click.native.prevent="updateProfile">
                Sign in
              </p-button>
              <p style="padding-top: 20px"> OR </p>
              <p-button type="info" style="background-color: crimson; border:none" round @click.native.prevent="updateProfile">
                Continue with google
              </p-button> <br>
              <p-button type="info" style="background-color: powderblue; border:none; margin: 10px;" round @click.native.prevent="updateProfile">
                Continue with twitter
              </p-button>
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
            username: "michael23",
            password: "",
          },
        };
      },
      methods: {
        updateProfile() {
          alert("Your data: " + JSON.stringify(this.user));
        },
      },
    };
    </script>
    <style></style>
    