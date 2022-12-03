import * as Vue from "vue";
import App from "./App.vue";
import * as VueRouter from "vue-router";
import Login from "./components/Login";
import Register from "./components/Register";

const routes = [
    { path: "/login", component: Login },
    { path: "/signup", component: Register },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

Vue.createApp(App).use(router).mount("#app");