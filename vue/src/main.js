import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";
import axios from "./plugins/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Toast, { TYPE } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: "mdiSvg",
  },
});

const options = {
  toastDefaults: {
    // ToastOptions object for each type of toast
    [TYPE.ERROR]: {
      timeout: 10000,
      closeButton: false,
    },
    [TYPE.SUCCESS]: {
      timeout: 3000,
      hideProgressBar: true,
    },
  },
};

const app = createApp(App);

app.use(router).use(vuetify).use(Toast, options).use(axios, {
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
