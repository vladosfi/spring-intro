import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:8081/api/", //process.env.VUE_APP_API_BASE_URL,
});

// // Add a request interceptor
// api.interceptors.request.use(
//   (config) => {
//     //Showing Vue loader before every request
//     //  loader = this.$loading.show({
//     //    // Optional parameters
//     //    container: this.fullPage ? null : this.$refs.formContainer,
//     //   canCancel: false,
//     //   onCancel: this.onCancel,
//     // });
//     // const token = localStorage.getItem("token");
//     // if (token) {
//     //   config.headers.common["AUTHORIZER"] = token; //set Auth token
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// api.interceptors.response.use(
//   (response) => {
//     // Do something with response data
//     //loader.hide(); //hiding loader on when receive response
//     return response;
//   },
//   (error) => {
//     // check for errorHandle config
//     // eslint-disable-next-line no-prototype-builtins
//     if (error.config?.hasOwnProperty("errorHandle") && error.config.errorHandle === false) {
//       //loader.hide(); //hiding loader on error
//       return Promise.reject(error);
//     }
//     // Do something with response error
//     if (error.response?.status) {
//       //loader.hide(); //hiding loader on error
//       switch (error.response?.status) {
//         case 400:
//           //this.testToast(error.response.data.message);
//           //this.toaster("Something went wrong!");
//           console.log(error.response.data.apierror.message);
//           break;
//         case 401:
//           //this.toaster("Something went wrong!");
//           console.log(error.response.data.apierror.message);
//           break;
//         case 403:
//           //this.toaster("Something went wrong!");
//           console.log(error.response.data.apierror.message);
//           break;
//         case 404:
//           //this.toaster("Something went wrong!");
//           console.log(error.response.data.apierror.message);
//           break;
//         case 500:
//           //this.toaster("Something went wrong!");
//           console.log(error.response.data.apierror.message);
//       }
//       //throw new Error(error);
//       return Promise.reject(error);
//     }
//   }
// );


const CreateBaseApiService = (resource) => {
  return {
    // Get a list of resources
    list: (config) => api.get(`${resource}`, config),
    // Get a single resource by its id
    get: (id, config) => api.get(`${resource}/${id}`, config),
    // Create a new resource
    create: (payload) => api.post(`${resource}`, payload),
    // Replace an existing resource with payload
    update: (id, payload) => api.put(`${resource}/${id}`, payload),
    // Merge new payload into a resource
    patch: (id, payload) => api.patch(`${resource}/${id}`, payload),
    // Remove a resource by its id
    remove: (id) => api.delete(`${resource}/${id}`),
  };
};

const Api = {
  posts: {
    ...CreateBaseApiService("products"),
    // example of a custom call
    custom: ({ id }) => api.get(`products/some/custom/call/${id}`),
  },
};



export default Api;
