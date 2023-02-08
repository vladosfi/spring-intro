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
  },
  actions: {
    async fill(products) {
      this.products = products;
      //this.products = (await import("@/data/products.json")).default;
    },
    createProduct(product) {
      this.products.push({ ...product });
    },
    updateProduct(product) {
      let index = this.products.findIndex((p) => product.id === p.id);
      if (index !== -1) {
        this.products.splice(index, 1, product);
        //this.products.push({ ...product });
      }
    },
    deleteProduct(productId) {
      let index = this.products.findIndex((p) => productId === p.id);
      this.products.splice(index, 1);
    },
  },
});
