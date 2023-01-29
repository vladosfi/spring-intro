<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">#</th>
        <th class="text-left">Product Name</th>
        <th class="text-left">Product Code</th>
        <th class="text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>
          <!-- <router-link :to="'/product/' + item.id">{{ item.code }}</router-link> -->
          <ProductDialog :dialogContent="dialogContent" :itemCode="item.code" :itemId="item.id" />
        </td>
        <td>
          <v-tooltip text="Edit" location="top">
            <template v-slot:activator="{ props }">
              <v-icon color="blue-darken-2" left dark v-bind="props">mdi-note-edit</v-icon>
            </template>
          </v-tooltip>

          <v-tooltip text="View" location="top">
            <template v-slot:activator="{ props }">
              <v-icon color="orange-darken-2" left dark v-bind="props">mdi-eye-circle</v-icon>
            </template>
          </v-tooltip>

          <v-tooltip text="Delete" location="top">
            <template v-slot:activator="{ props }">
              <v-icon color="red-darken-2" left dark v-bind="props">mdi-delete</v-icon>
            </template>
          </v-tooltip>

          <ConfirmDlg :disabled="disableEdit" :dialogContent="this.dialogContent" @agree="deleteProduct($event)" />

        </td>
      </tr>
    </tbody>
  </v-table>

  <!-- <button type="button" class="btn btn-info" @click="getData">Get Products</button> -->
</template>

<script>
import ProductDialog from "@/components/ProductDialog.vue";
import ConfirmDlg from "@/components/ConfirmDlg.vue";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {
    ProductDialog,
    ConfirmDlg,
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Table",
  data() {
    return {
      //  getData() {
      //    this.$axios.get("users").then((x) => console.log(x.data));
      // }
      items: {},
      dialogContent: {
        title: "Edit Product",
      },
    };
  },
  mounted() {
    this.$axios
      .get("products")
      .then((x) => (this.items = x.data))
      .catch((error) => console.log(error));
  },
  methods: {
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
<style>
i {
  cursor: pointer;
}
</style>
