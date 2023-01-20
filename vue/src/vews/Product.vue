<template>
  <div class="container" v-if="$route.params.id">
    <div class="row">
      <h1>Product Id: {{ $route.params.id }}</h1>
    </div>

    <div class="row">
      <form @submit.prevent="editPost">
        <div class="row align-items-center g-3">
          <div class="col-md-auto col-4">
            <label for="inputName" class="form-label">Name</label>
            <input :disabled="disableEdit" v-model="product.name" type="text" class="form-control" id="inputName" />
          </div>
          <div class="col-md-auto col-12">
            <label for="inputCode" class="form-label">Product Code</label>
            <input :disabled="disableEdit" v-model="product.code" type="text" class="form-control" id="inputCode" />
          </div>
          <div class="row align-items-center g-3">
            <div class="col-md-auto col-12">
              <button :disabled="disableEdit" type="submit" class="btn btn-primary">Save</button>
            </div>
            <div class="col-md-auto col-12">
              <button @click.prevent="enableEdit" type="button" class="btn btn-primary">{{ disableEdit ? "Edit" : "Cancel" }}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div class="container" v-else-if="!$route.params.id">
    <div class="row">
      <h1>Add Product</h1>
    </div>

    <div class="row">
      <form @submit.prevent="createPost">
        <div class="row align-items-center g-3">
          <div class="col-md-auto col-4">
            <label for="inputName" class="form-label">Name</label>
            <input v-model="product.name" type="text" class="form-control" id="inputName" />
          </div>
          <div class="col-md-auto col-12">
            <label for="inputCode" class="form-label">Product Code</label>
            <input v-model="product.code" type="text" class="form-control" id="inputCode" />
          </div>
          <div class="row align-items-center g-3">
            <div class="col-md-auto col-12">
              <button type="submit" class="btn btn-primary">Add</button>
            </div>
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
    // console.log(this.$route.params.id);
    // if (this.$route.params.id !== undefined) {
      this.$axios
        .get("products/" + this.$route.params.id)
        .then((x) => (this.product = x.data))
        .catch((e) => {
          this.errors.push(e);
        });
    // }
  },
  data() {
    return {
      disableEdit: true,
      product: {
        id: "",
        name: "",
        code: "",
      },
    };
  },
  methods: {
    editPost() {
      this.$axios
        .post("products/" + this.product.id, this.product)
        .then((response) => console.log(response))
        .catch((e) => {
          this.errors.push(e);
        });
    },
    createPost() {},
    enableEdit() {
      this.disableEdit = !this.disableEdit;
    },
  },
};
</script>

<style></style>
