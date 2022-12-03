<template>
  <div class="wrapper-auth">
    <div class="title-text">
      <div class="title login">Login Form</div>
      <div class="title signup">Signup Form</div>
    </div>
    <div class="form-container">
      <div class="form-inner">
        <form @submit.prevent="handleSubmit" class="login">
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
          <div class="pass-link">
            <a href="#">Forgot password?</a>
          </div>
          <div class="field btn">
            <div class="btn-layer"></div>
            <input type="submit" value="Login" />
          </div>
          <div class="signup-link">
            Not a member? <a href="/signup">Signup now</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post("login", {
        email: this.email,
        password: this.password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
    },
  },
};
</script>
