import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import VueExtendLayouts from "vue-extend-layout";
import { initFacebookSdk, jwtInterceptor, errorInterceptor } from "./_helpers";
const app = createApp(App).use(Antd);
app.config.productionTip = false;

app.use(vue3GoogleLogin, {
  clientId:
    "288535238405-jike4ee31n8rp6crhopjg9h6pacrm5i3.apps.googleusercontent.com",
});

initFacebookSdk().then(startApp);

app.use(createPinia());
app.use(VueExtendLayouts);
app.use(router);
function startApp() {
  app.mount("#app");
}
