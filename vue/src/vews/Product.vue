<template>
  <div>
    <span v-if="!this.$route.params.id">
      <h3>Create Product</h3>
      <ProductForm @on-submit="createProduct" />
    </span>
    <span v-else>
      <h3>Edit Product</h3>
      <ProductForm :productId="productId" @on-submit="updateProduct" />
    </span>
  </div>
</template>

<script>
import ProductForm from "../components/ProductForm.vue";

/* eslint-disable */
export default {
  name: "Product",
  components: {
    ProductForm,
  },
  data() {
    return {
      disableEdit: true,
      productId: this.$route.params.id,
      product: {
        id: "",
        name: "",
        code: "",
      },
    };
  },
  methods: {
    updateProduct(productForm) {
      console.log("updating", productForm);

      this.$axios
        .post("products/" + this.productId, productForm)
        .then((response) => console.log(response))
        .catch((e) => {
          this.errors.push(e);
        });
    },
    createProduct(productForm) {
      console.log("creating", productForm);

      this.$axios
        .post("products/", productForm)
        .then((response) => console.log(response))
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
