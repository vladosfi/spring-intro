<template>
  <v-dialog max-width="50%" v-model="dialog">
    <template v-slot:activator="{ props }">
      <!-- <v-btn color="primary" v-bind="props"> Open Dialog </v-btn> -->

      <v-btn flat v-bind="props" v-if="!itemId"> Add Product </v-btn>
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
        <v-btn  color="blue-darken-1" variant="text" @click="updateProduct" v-else> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, numeric, maxLength } from "@vuelidate/validators";

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
    return { v$: useVuelidate() };
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
    createProduct() {
      this.$axios
        .post("products/", this.form)
        .then((result) => console.log(result.data))
        .then((this.dialog = false))
        .then(this.$router.push("/"))
        .catch((e) => {
          console.log(e);
          //this.errors.push(e);
        });
    },
    updateProduct() {
      this.$axios
        .put("products/" + this.form.id, this.form)
        .then((result) => console.log(result.data))
        .then((this.dialog = false))
        .then(() => this.$router.push("/"))
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  watch: {
    dialog(visible) {
      if (this.itemId && visible) {
        this.$axios
          .get("products/" + this.itemId)
          .then((x) => (this.form = x.data))
          .catch((e) => {
            this.errors.push(e);
          });
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
