<template>
  <div style="width: 50%; margin: auto">
    <card class="card" title="Register" style="align-items: center; margin-top: 20%; padding: auto"> 
      <div>
        <form @submit.prevent="registerUser">
          <div class="row">
            <div class="col-md-12">
              <fg-input
                type="text"
                label="Email"
                placeholder="Email"
                v-model="user.email"
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
                type="password"
                label="Password"
                placeholder="Password"
                v-model="user.password"
              >
              </fg-input>
            </div>
          </div>
          <div class="text-center">
            <p-button type="info" round @click.native.prevent="registerUser">
              Register
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
        email: '',
        username: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await fetch('/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (response.ok) {
          // Registration successful
          this.username = '';
          this.password = '';
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

<style></style>
