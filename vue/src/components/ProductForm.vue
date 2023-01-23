<template>
  <div class="row">
    <form @submit.prevent="$emit('on-submit', form)">
      <div class="row align-items-center g-3">
        <div class="col-md-auto col-4">
          <label for="inputName" class="form-label">Name</label>
          <input :disabled="disableEdit" v-model="form.name" type="text" class="form-control" id="inputName" />
        </div>
        <div class="col-md-auto col-12">
          <label for="inputCode" class="form-label">Product Code</label>
          <input :disabled="disableEdit" v-model="form.code" type="text" class="form-control" id="inputCode" />
        </div>
        <div class="row align-items-center g-3" v-if="!productId">
          <div class="col-md-auto col-12">
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </div>
        <div class="row align-items-center g-3" v-else>
          <div class="col-md-auto col-12">
            <button :disabled="disableEdit" type="submit" class="btn btn-primary">Save</button>
          </div>
          <div class="col-md-auto col-12">
            <button @click.prevent="enableEdit" type="button" class="btn btn-primary">{{ disableEdit ? "Edit" : "Cancel" }}</button>
          </div>
          <div class="col-md-auto col-12">
            <button @click.prevent="deleteProduct" :disabled="disableEdit" type="button" class="btn btn-primary">Delete</button>
          </div>
        </div>
      </div>
    </form>
    <!-- <p>{{ this.product }}</p> -->
  </div>
<v-layout column align-center>
  <PopUp />
</v-layout>

</template>

<script>
import PopUp from "./PopUp"
/* eslint-disable */
export default {
  name: "ProductForm",
  components: { PopUp },
  dialog: false,
  props: {
    productId: {
      type: String,
    },
  },
  mounted() {
    if (this.productId) {
      this.$axios
        .get("products/" + this.$route.params.id)
        .then((x) => (this.form = x.data))
        .catch((e) => {
          this.errors.push(e);
        });
    } else {
      this.disableEdit = false;
    }
  },
  data() {
    return {
      disableEdit: true,
      form: {
        id: "",
        name: "",
        code: "",
      },
    };
  },
  methods: {
    enableEdit() {
      this.disableEdit = !this.disableEdit;
    },
    deleteProduct() {
      this.$axios
        .delete("products/", productId)
        .then(this.$router.push("/"))
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
