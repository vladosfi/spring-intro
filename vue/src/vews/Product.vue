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
      let that = this;

      this.$axios
        .put("products/" + this.productId, productForm)
        .then((response) => this.$router.push("/"))
        .catch((e) => {
          this.errors.push(e);
        });
    },
    createProduct(productForm) {
      this.$axios
        .post("products/", productForm)
        .then(this.$router.push("/"))
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
