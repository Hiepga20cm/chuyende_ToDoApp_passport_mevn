import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";
import "./assets/main.css";

const app = createApp(App);

app.use(vue3GoogleLogin, {
  clientId:
    "288535238405-jike4ee31n8rp6crhopjg9h6pacrm5i3.apps.googleusercontent.com",
});
app.use(createPinia());
app.use(router);

app.mount("#app");
