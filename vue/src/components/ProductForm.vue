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
            <v-btn type="submit" color="primary"> Add </v-btn>
          </div>
        </div>
        <div class="row align-items-center g-3" v-else>
          <div class="col-md-auto col-12">
            <v-btn :disabled="disableEdit" color="success" type="submit"> Save </v-btn>
          </div>
          <div class="col-md-auto col-12">
            <v-btn @click.prevent="enableEdit" color="primary"> {{ disableEdit ? "Edit" : "Cancel" }} </v-btn>
          </div>
          <div class="col-md-auto col-12">
            <!-- <button @click.prevent="deleteProduct" :disabled="disableEdit" type="button" class="btn btn-warning">Delete</button> -->
            <ConfirmDlg :disabled="disableEdit" :dialogContent="this.dialogContent" @agree="deleteProduct($event)" />
          </div>
        </div>
      </div>
    </form>
    <!-- <p>{{ this.product }}</p> -->
    <AddProduct></AddProduct>
  </div>


</template>

<script>
import ConfirmDlg from "@/components/ConfirmDlg.vue";
import ProductDialog from "@/components/ProductDialog.vue";
/* eslint-disable */
export default {
  name: "ProductForm",
  components: {
    ConfirmDlg,
    ProductDialog,
  },
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
      dialogContent: {
        btnName: "Delete",
        title: "Confirm Delete",
        text: "Are you sure you want to delete this record?",
        disableEdit: true,
      },
    };
  },
  methods: {
    enableEdit() {
      this.disableEdit = !this.disableEdit;
      this.dialogContent.disableEdit = this.disableEdit;
    },
    deleteProduct(agree) {
      if (agree === true) {
        this.$axios
          .delete("products/" + this.productId)
          .then(this.$router.push("/"))
          .catch((e) => {
            this.errors.push(e);
          });
      }
    },
  },
};
</script>
