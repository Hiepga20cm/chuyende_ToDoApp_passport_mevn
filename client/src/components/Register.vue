<template>
  <div class="wrapper-auth">
    <div class="title-text">
      <div class="title signup">Signup Form</div>
    </div>
    <div class="form-container">
      <div class="form-inner">
        <form @submit.prevent="handleSubmit" class="signup">
          <div class="field">
            <input
              type="text"
              v-model="first_name"
              placeholder="First Name"
              required
            />
          </div>
          <div class="field">
            <input
              type="text"
              v-model="last_name"
              placeholder="Last Name"
              required
            />
          </div>
          <div class="field">
            <input
              type="text"
              v-model="email"
              placeholder="Email Address"
              required
            />
          </div>
          <div class="field">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              required
            />
          </div>
          <div class="field">
            <input
              type="password"
              v-model="password_confirm"
              placeholder="Confirm password"
              required
            />
          </div>
          <div class="field btn">
            <div class="btn-layer"></div>
            <input type="submit" value="Signup" />
          </div>
          <div class="signup-link">
            Have an account? <a href="login">Login now</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirm: "",
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post("register", {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm,
      });
      console.log(response);
      this.$router.push("/login");
    },
  },
};
</script>
