<template>
    <card class="card" title="Login/Register">
      <div>
        <form @submit.prevent>
          <div class="row">
            <div class="col-md-5">
              <fg-input
                type="text"
                label="Username"
                placeholder="Username"
                v-model="user.username"
              >
              </fg-input>
            </div>
          </div>
  
          <div class="row">
            <div class="col-md-5">
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
  