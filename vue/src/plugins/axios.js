// import axios from "axios";


// const axiosPlugin = {
//   install: function (Vue, options) {
//     // Check that the Vue object is defined
//     if (!Vue.prototype) {
//       Vue.prototype = {};
//     }
//     // Set the $http property on the Vue prototype
//     Vue.prototype.$http = axios.create({
//       baseURL: options.baseUrl,
//       headers: {
//         Authorization: options.token ? `Bearer ${options.token}` : "",
//       },
//     });
//   },
// };

// export default axiosPlugin;

// // export default {
// //   install: function (Vue, options) {
// //     // Check that the Vue object is defined
// //     if (!Vue.prototype) {
// //       Vue.prototype = {};
// //     }

// //     Vue.prototype.$http = axios.create({
// //       baseURL: options.baseUrl,
// //       headers: {
// //         Authorization: options.token ? `Bearer ${options.token}` : "",
// //       },
// //     });
// //   },
// // };

// // export default {
// //     install: (app, options) => {
// //         app.config.globalProperties.$axios = axios.create({
// //             baseURL: options.baseUrl,
// //             headers: {
// //                 Authorization: options.token ? `Bearer ${options.token}` : '',
// //             }
// //         })
// //     }
// // }


import axios from "axios";
import VueAxios from "vue-axios";

const AxiosPlugin = {
  install: (app, options) => {
    app.use(VueAxios, axios);
    app.config.globalProperties.$http = app.axios.create({
      baseURL: options.baseUrl,
      headers: {
        Authorization: options.token ? `Bearer ${options.token}` : "",
      },
    });
  },
};

export default AxiosPlugin;