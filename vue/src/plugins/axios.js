import axios from 'axios'

// axios.interceptors.request.use((request) => {
//   //request.headers.Authorization = userStore.token
//   console.log("Adding token to header", request);
// });

export default {
    install: (app, options) => {
        app.config.globalProperties.$axios = axios.create({
            baseURL: options.baseUrl,
            headers: {
                Authorization: options.token ? `Bearer ${options.token}` : '',
            }
        })
    }
}

