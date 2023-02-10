import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api/", //process.env.VUE_APP_API_BASE_URL,
});

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
