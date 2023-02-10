import App from "./App.vue";
import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import axios from "./plugins/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Toast, { TYPE, POSITION } from "vue-toastification";
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
      position: POSITION.BOTTOM_RIGHT,
    },
    [TYPE.SUCCESS]: {
      timeout: 3000,
      hideProgressBar: true,
      position: POSITION.BOTTOM_RIGHT,
    },
    [TYPE.INFO]: {
      timeout: 3000,
      hideProgressBar: true,
      position: POSITION.BOTTOM_RIGHT,
    },
  },
};
const pinia = createPinia()
const app = createApp(App);

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});

app.use(router).use(pinia).use(vuetify).use(Toast, options).use(axios, {
  baseUrl: "http://localhost:8081/api/",
});

app.mount("#app");
