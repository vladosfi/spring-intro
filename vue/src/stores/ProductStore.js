import Api from "@/services/ApiService";
import { defineStore } from "pinia";

//import products from "@/data/products.json"

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {
      products: [],
    };
  },
  getters: {
    count() {
      return this.products.length;
    },
    getProductById: (state) => {
      return (productId) => state.products.find((product) => product.id === productId);
    },
  },
  actions: {
    fill() {
      //this.products = products;
      //this.products = (await import("@/data/products.json")).default;
      Api.posts
        .list()
        .then((x) => (this.products = x.data))
        .then(this.$router.push("/"));
    },
    getById(productId) {
      let index = this.products.findIndex((p) => productId === p.id);
      
      Api.posts.get(productId).then((x) => {
        if (index !== -1) {
          this.products.splice(index, 1, x.data);
        }
      });
    },
    createProduct(formData) {
      Api.posts
        .create(formData)
        .then((x) => this.products.push({ ...x.data }))
        .then(this.$router.push("/"))
        .catch((e) => console.log(e));
    },
    updateProduct(product) {
      let index = this.products.findIndex((p) => product.id === p.id);

      Api.posts.update(product.id, product).then(this.$router.push("/"));

      if (index !== -1) {
        this.products.splice(index, 1, product);
        //this.products.push({ ...product });
      }
    },
    deleteProduct(productId) {
      Api.posts.remove(productId);
      let index = this.products.findIndex((p) => productId === p.id);
      this.products.splice(index, 1);
    },
  },
});
