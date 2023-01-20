<template>
  <div class="container">
    <div class="row">
      <h1>Product Id: {{ $route.params.id }}</h1>
    </div>

    <div class="row">
      <form @submit.prevent="createPost">
        <div class="row align-items-center g-3">
          <div class="col-md-auto col-12">
            <label for="inputName" class="form-label">Name</label>
            <input v-model="product.name" type="text" class="form-control" id="inputName"/>
          </div>
          <div class="col-md-auto col-12">
            <label for="inputCode" class="form-label">Product Code</label>
            <input v-model="product.code" type="text" class="form-control" id="inputCode"/>
          </div>
          <div class="col-md-auto col-12">
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "Product",
  components: {},
  mounted() {
    this.$axios
      .get("products/" + this.$route.params.id)
      .then((x) => (this.product = x.data))
      .catch((e) => {
        this.errors.push(e);
      });
  },
  data() {
    return {
      product: {
        id: '',
        name: '',
        code: ''
      },
    };
  },
  methods: {
    createPost() {
      this.$axios
        .post("products/" + this.product.id, this.product)
        .then((response) => console.log(response))
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<style></style>
