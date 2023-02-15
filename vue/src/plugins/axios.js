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
    // Add response interceptor
    app.config.globalProperties.$http.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        let errorMessage = error;
        // Handle error with status code
        if (error.response) {
          switch (error.response?.status) {
            case 400:
              errorMessage = getApiErrorDetails(error);
              break;
            case 401:
              window.location = "/login";
              break;
            case 403:
              errorMessage = getApiErrorDetails(error);
              break;
            case 404:
              errorMessage = getApiErrorDetails(error);
              break;
            case 500:
              errorMessage = "Error code: " + 500 + "\nInternal Server Error";
          }
        } else {
          // Handle network errors here
          return "Network Error!\n" + error;
        }
        return Promise.reject(errorMessage);
      }
    );
  },
};

const getApiErrorDetails = (error) => {
  let errorDetails = error.response.data.apierror.message + "\n";
  if (error.response.data.apierror.subErrors) {
    error.response.data.apierror.subErrors.forEach((subErr) => {
      errorDetails += "Message: " + subErr.message + "\n";
    });
  }

  return errorDetails;
};

export default AxiosPlugin;
