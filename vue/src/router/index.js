import { createWebHistory, createRouter } from "vue-router";
import Home from "@/vews/Home.vue";
import About from "@/vews/About.vue";
import NotFound from "@/vews/NotFound.vue";

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
  // will match everything and put it under `$route.params.pathMatch`
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
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
