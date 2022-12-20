import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginForm.vue";
import Layout from "../components/Layout.vue";
//import newFb from "../components/newFb.vue";
import Facebook from "../components/Facebook.vue";
//import DateCellRender from "../components/DateCellRender.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/layout",
      name: "home",
      component: () => Layout,
    },
    {
      path: "/login",
      name: "login",
      component: () => Login,
      meta: {
        layout: () => Layout,
      },
    },
    {
      path: "/fb",
      component: () => Facebook,
    },
    // {
    //   path: "/date",
    //   name: "date",
    //   component: () => DateCellRender,
    // },
  ],
});

export default router;
