<template>
    <v-dialog max-width="50%" v-model="dialog">
      <template v-slot:activator="{ props }">
        <!-- <v-btn color="primary" v-bind="props"> Open Dialog </v-btn> -->

        <v-btn flat v-bind="props" v-if="!itemId">
          <v-icon left dark>mdi-plus-circle</v-icon>
          Add Product
        </v-btn>
        <!-- <a :href="" v-bind="props" v-else>
          {{ itemId }}
        </a> -->
        <span id="hoverCell" v-bind="props" v-else>
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
              <v-col cols="12">
                <v-text-field v-model="form.name" label="Name*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.code" label="Product Code*" hint="numbers only" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Close </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="createProduct" v-if="!itemId"> Add </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="updateProduct" v-else> Save </v-btn>          
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
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
  data: () => ({
    dialog: false,
    form: {
      id: "",
      name: "",
      code: "",
    },
  }),
  methods: {
    createProduct() {
      this.$axios
        .post("products/", this.form)
        .then((result) => console.log(result.data))
        .then((this.dialog = false))
        .then(this.$router.push("/"))
        .catch((e) => {
          this.errors.push(e);
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
#hoverCell:hover {
  text-decoration: dashed;
  cursor: pointer;
}
#hoverCell {
  color: blue;
}

</style>
