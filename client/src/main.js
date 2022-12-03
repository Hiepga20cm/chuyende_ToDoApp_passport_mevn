import Vue from "vue";
import router from "./router";
import { createApp } from "vue";
import App from "./App.vue";
import "./axios";

Vue.config.productionTip = false;

createApp(App).mount("#app");

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");