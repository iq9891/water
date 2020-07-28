import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/text",
    name: "Text",
    component: () =>
      import(/* webpackChunkName: "text" */ "../views/Text.vue")
  },
  {
    path: "/title",
    name: "Title",
    component: () =>
      import(/* webpackChunkName: "title" */ "../views/Title.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
