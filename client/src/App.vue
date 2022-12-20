<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import LoginForm from "./views/LoginForm.vue";
import LayoutVue from "./components/Layout.vue";
import VueExtendLayouts from "vue-extend-layout";

export default {
  name: "App",
  components: {
    VueExtendLayouts,
    LayoutVue,
  },
};
</script>

<style></style>
