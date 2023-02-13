<template>
  <v-dialog max-width="50%" v-model="dialog">
    <template v-slot:activator="{ props }">
      <!-- <v-btn color="primary" v-bind="props"> Open Dialog </v-btn> -->
      <v-btn v-bind="props" v-if="!itemId"> Add Product </v-btn>
      <!-- <a :href="" v-bind="props" v-else>
          {{ itemId }}
        </a> -->
      <span v-bind="props" v-else>
        <!-- <v-btn  color="warning" v-bind="props"> {{dialogContent.btnName}} </v-btn> -->
        <span v-bind="props">
          <v-tooltip text="Edit" location="top">
            <template v-slot:activator="{ props }">
              <v-icon color="blue-darken-2" left dark v-bind="props">mdi-note-edit</v-icon>
            </template>
          </v-tooltip>
        </span>
      </span>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ dialogContent.title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" :class="{ error: v$.form.name.$errors.length }">
              <v-text-field v-model="v$.form.name.$model" label="Name*"></v-text-field>
              <!-- error message -->
              <small class="input-errors" v-for="(error, index) of v$.form.name.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </small>
            </v-col>
            <v-col cols="12" :class="{ error: v$.form.code.$errors.length }">
              <v-text-field v-model="v$.form.code.$model" label="Product Code*" hint="Enter code"></v-text-field>
              <small class="input-errors" v-for="(error, index) of v$.form.code.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </small>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Close </v-btn>
        <v-btn  color="blue-darken-1" variant="text" @click="createProduct" v-if="!itemId"> Add </v-btn>
        <v-btn :disabled="v$.form.$invalid" color="blue-darken-1" variant="text" @click="updateProduct" v-else> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, numeric, maxLength } from "@vuelidate/validators";
import { useProductStore } from "../stores/ProductStore";
import Api from "@/services/ApiService";
import { useToast } from "vue-toastification";

export default {
  name: "ProductDialog",
  props: {
    dialogContent: {
      title: String,
      name: String,
      code: String,
    },
    itemId: Number,
    itemCode: String,
  },
  setup() {
    const toast = useToast();
    const productStore = useProductStore();
    return { v$: useVuelidate(), productStore, toast };
  },
  data: () => ({
    dialog: false,
    form: {
      id: "",
      name: "",
      code: "",
    },
  }),
  validations() {
    return {
      form: {
        name: {
          required,
          min: minLength(3),
          max: maxLength(50),
        },
        code: {
          required,
          min: minLength(10),
          max: maxLength(10),
          numeric,
        },
      },
    };
  },
  methods: {
    async createProduct() {
      await Api.posts
        .create(this.form)
        .then((x) => {
          this.productStore.createProduct(x);
          this.dialog = false;
          this.toast.info("Тhe product has been added");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response.data.apierror);
          var errorMessage = error.response.data.apierror.message + "\n";
          if (error.response.data.apierror.subErrors !== undefined) {
            error.response.data.apierror.subErrors.forEach(subErr => {
              errorMessage += "Message: " + subErr.message + "\n";
            });
            
          }
          this.toast.error(errorMessage);  
        });

    },
    async updateProduct() {
      await Api.posts
        .update(this.form.id, this.form)
        .then(() => {
          this.productStore.updateProduct(this.form);
          this.$router.push("/");
          this.toast.info("Тhe the product has been updated");
          this.dialog = false;
        })
        .catch((error) => this.toast.error(error.response.data.apierror.message));
    },
  },
  watch: {
    dialog(visible) {      
      this.form = {
        id: "",
        name: "",
        code: "",
      };

      if (this.itemId && visible) {
         Api.posts
          .get(this.itemId)
          .then((x) => {
            this.form = this.productStore.getProductById(x.data.id);
          })
          .catch((error) => this.toast.error(error.response.data.apierror.message));
        //this.$axios.get("products/" + this.itemId).then((x) => (this.form = x.data));
      }
    },
  },
};
</script>

<style>
#app > div > div > main > div > div.d-flex.flex-row-reverse > button > span.v-btn__content {
  color: blue;
}

#app > div > div > main > div > div.d-flex.flex-row-reverse > button {
  background-color: #fafafa;
}
</style>
