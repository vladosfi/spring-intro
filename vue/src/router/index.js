import { createWebHistory, createRouter } from "vue-router";
import Home from "@/vews/Home.vue";
import Product from "@/vews/Product.vue";
import About from "@/vews/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product/:id?",
    name: "Product",
    component: Product,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
