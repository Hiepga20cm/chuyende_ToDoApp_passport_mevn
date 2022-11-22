<script setup>
import { googleTokenLogin } from "vue3-google-login";
import authApi from "../api/modules/auth";
const login = () => {
  googleTokenLogin().then((response) => {
    console.log("Handle the response", response);
    console.log(response.access_token);
    authApi.googleAuth(response.access_token);
  });
};
</script>

<template>
  <button @click="login">Login Using Google</button>
</template>
