import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";
import axios from "./plugins/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import "@mdi/font/css/materialdesignicons.css"


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: "mdiSvg",
  },
});

const app = createApp(App);

app.use(router)
  .use(vuetify)
  .use(axios, {
  baseUrl: "http://localhost:8081/api/",
});

app.mount("#app");

// createApp(App)
//   .use(router)
//   .use(vuetify)
//   .use(axios, {
//     //baseUrl: "https://jsonplaceholder.typicode.com/",
//     baseUrl: "http://localhost:8081/api/",
//   })
//   .mount("#app");
