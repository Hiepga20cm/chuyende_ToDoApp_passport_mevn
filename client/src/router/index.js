import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginForm.vue";
import Layout from "../components/Layout.vue";
//import newFb from "../components/newFb.vue";
import Facebook from "../components/Facebook.vue";
//import DateCellRender from "../components/DateCellRender.vue";
import changePassword from "../components/FormChangePassword.vue";
import register from "../views/RegisterForm.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/layout",
      name: "home",
      component: () => Layout,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");
        if (token) {
          next();
        } else {
          next({ path: "/" });
        }
      },
    },
    {
      path: "/",
      name: "Login",
      component: () => Login,
      meta: {
        layout: () => Layout,
      },
    },
    {
      path: "/fb",
      component: () => Facebook,
    },
    {
      path: "/register",
      name: "register",
      component: () => register,
    },
    {
      path: "/profile",
      name: "profile",
      component: () => changePassword,
    },
  ],
});

export default router;
