import { createWebHistory, createRouter } from "vue-router";
import Home from "@/vews/Home.vue";
import About from "@/vews/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  // {
  //   path: "/product/:id?",
  //   name: "Product",
  //   component: Product,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
