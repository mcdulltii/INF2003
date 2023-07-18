<template>
  <div style="width: 50%; margin: auto">
    <card class="card" title="Login" style="align-items: center; margin-top: 20%; padding: auto"> 
      <div>
        <form @submit.prevent="loginUser">
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
          </div>
  
          <div class="row">
            <div class="col-md-20">
              <fg-input
                type="password"
                label="Password"
                placeholder="Password"
                v-model="user.password"
              >
              </fg-input>
            </div>
          </div>
          <div class="text-center">
            <p-button type="info" round @click.native.prevent="loginUser">
              Sign in
            </p-button>
            <p style="padding-top: 20px"> OR </p>
            <p-button type="info" style="background-color: crimson; border:none" round @click.native.prevent="updateProfile">
              Continue with google
            </p-button> <br>
            <p-button type="info" style="background-color: powderblue; border:none; margin: 10px;" round @click.native.prevent="updateProfile">
              Continue with twitter
            </p-button>
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
      user: {
        username: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await fetch('/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.user.username,
            password: this.user.password,
          }),
        });

        if (response.ok) {
          // Login successful
          this.user.password = '';
          this.error = '';
          // Redirect to the home page
          this.$router.push('/');
        } else {
          // Login failed
          const data = await response.json();
          this.error = data.error || 'Login failed.';
        }
      } catch (error) {
        console.error(error);
        this.error = 'An error occurred during login.';
      }
    },
  },
};
</script>

<style></style>
