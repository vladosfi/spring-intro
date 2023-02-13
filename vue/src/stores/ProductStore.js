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
    fill(products) {
      //this.products = products;
      //this.products = (await import("@/data/products.json")).default;
      this.products = products.data;
    },
    createProduct(form) {
      this.products.push({ ...form.data });
    },
    updateProduct(product) {
      let index = this.products.findIndex((p) => product.id === p.id);

      if (index !== -1) {
        this.products.splice(index, 1, product);
        //this.products.push({ ...product });
      }
    },
    async deleteProduct(productId) {
      let index = this.products.findIndex((p) => productId === p.id);
      this.products.splice(index, 1);
    },
  },
});
