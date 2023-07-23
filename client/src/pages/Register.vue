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
          <div class="row">
            <div class="col-md-20">
              <fg-input
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                v-model="confirmPassword"
              >
              </fg-input>
            </div>
          </div>
          <div class="text-center">
            <p-button type="info" round @click.native.prevent="registerUser">
              Register
            </p-button>
            <span class="spacer"></span>
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
        cfmpassword: '',
      },
      error: '',
    };
  },
  methods: {
    async registerUser() {

      // Perform client-side validation
      if (
        !this.user.email ||
        !this.user.username ||
        !this.user.password ||
        this.user.password.length < 8
      ) {
        this.error = 'Please fill in all fields and ensure the password is between 8';
        return;
      }

      if (this.user.password !== this.confirmPassword) {
        this.error = 'Passwords do not match.';
        return;
      }

      try {
        const response = await fetch('/users/signup', {
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
          // Registration successful
          this.user.username = '';
          this.user.password = '';
          this.error = '';
          // Redirect to the login page
          this.$router.push('/login');
        } else {
          // Registration failed
          const data = await response.json();
          this.error = data.error || 'Registration failed.';
        }
      } catch (error) {
        console.error(error);
        this.error = 'An error occurred during registration.';
      }
    },
  },
};
</script>

<style>
.spacer {
  margin: 0 10px;
}
</style>
