import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";
import axios from "./plugins/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";


    
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




// // Add a request interceptor
// let loader;
// axios.interceptors.request.use(
//     config => {
//         //Showing Vue loader before every request         
//         loader = this.$loading.show({
//             // Optional parameters
//             container: this.fullPage ? null : this.$refs.formContainer,
//             canCancel: false,
//             onCancel: this.onCancel
//         });
//         const token = localStorage.getItem("token");
//         if (token) {
//           config.headers.common["AUTHORIZER"] = token; //set Auth token
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
// );


// // Add a response interceptor
// axios.interceptors.response.use((response) => {
//     // Do something with response data
//     loader.hide(); //hiding loader on when receive response
//     return response;
//   }, (error) => {
//      // check for errorHandle config
//      // eslint-disable-next-line no-prototype-builtins
//      if (error.config.hasOwnProperty("errorHandle") &&
//               error.config.errorHandle === false) {
//         loader.hide(); //hiding loader on error
//         return Promise.reject(error);
//      }
//      // Do something with response error
//      if (error.response.status) {
//               loader.hide(); //hiding loader on error
// //Handling different error status using Switch caase               
//             switch (error.response.status) {
//                 case 400:
//                   this.$swal(error.response.data.message, {
//                     closeOnClickOutside: false
//                   }); //showing Swal Alert
//                   break;
//                 case 401:
//                   //logout user
//                   this.$swal(error.response.data.message, {
//                     closeOnClickOutside: false
//                   }); //showing Swal Alert
//                   break;
//                 case 403:
//                   this.$swal(error.response.data.message, {
//                     closeOnClickOutside: false
//                   }); //showing Swal Alert
//                   break;
//                 case 404:
//                   this.$swal(error.response.data.message, {
//                     closeOnClickOutside: false
//                   }); //showing Swal Alert
//                   break;
//                 case 500:
//                   this.$swal(error.response.data.message, {
//                     closeOnClickOutside: false
//                   }); //showing Swal Alert
//               }
//             }
//           }
//   );



const app = createApp(App);

app
  .use(router)
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



