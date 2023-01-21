import { createWebHistory, createRouter } from "vue-router";
import Home from "@/vews/Home.vue";
import Product from "@/vews/Product.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
