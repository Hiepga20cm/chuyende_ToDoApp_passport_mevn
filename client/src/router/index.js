import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginForm.vue";
import Layout from "../components/Layout.vue";
//import newFb from "../components/newFb.vue";
import Facebook from "../components/Facebook.vue";
//import DateCellRender from "../components/DateCellRender.vue";
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
          next( );
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
  ],
});
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");
//   // If logged in, or going to the Login page.
//   console.log(token);
//   if (to.name !== "Login" && !token) {
//     // Continue to page.
//     console.log('sss');
//     next({ name: "Login" });
//   } else {
//     console.log('ggg');
//     // Not logged in, redirect to login.
//     next({ name: "Login" });
//   }
// });

export default router;
