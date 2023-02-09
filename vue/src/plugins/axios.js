import axios from 'axios'

const axiosInstance = axios.create({
  withCredentials: true,
});

export default {
    install: (app, options) => {
        app.config.globalProperties.$axios = axios.create({
            ...axiosInstance,
            baseURL: options.baseUrl,
            headers: {
                Authorization: options.token ? `Bearer ${options.token}` : '',
            }
        })
    }
}

