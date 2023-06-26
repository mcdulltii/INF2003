<template>
    <card class="card" title="Create Post">
      <div>
        <form @submit.prevent>
          <div class="row">
            <div class="col-md-12">
              <fg-input
                type="text"
                label="Title"
                placeholder="Home Address"
                v-model="user.address"
              >
              </fg-input>
            </div>
          </div>  
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Content</label>
                <textarea
                  rows="5"
                  class="form-control border-input"
                  placeholder="Here can be your description"
                  v-model="user.aboutMe"
                >
                </textarea>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p-button type="info" round @click.native.prevent="updateProfile">
              Post
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
          address: "Melbourne, Australia",
          aboutMe: `We must accept finite disappointment, but hold on to infinite hope.`,
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
  