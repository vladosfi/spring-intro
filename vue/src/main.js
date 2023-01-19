import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "./plugins/axios";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(axios, {
    //baseUrl: "https://jsonplaceholder.typicode.com/",
    baseUrl: "http://localhost:8080/api/",
  })
  .mount("#app");
