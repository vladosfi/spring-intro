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
      <tr class="row-bg" v-for="item in productStore.products" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>
          <!-- <router-link :to="'/product/' + item.id">{{ item.code }}</router-link> -->
          <!-- <ProductDialog :dialogContent="dialogContent" :itemCode="item.code" :itemId="item.id" /> -->
          {{ item.code }}
        </td>
        <td>
          <ProductDialog :dialogContent="productDialogContent" :itemCode="item.code" :itemId="item.id" />
          <!-- <v-tooltip text="Edit" location="top">
            <template v-slot:activator="{ props }">
              <v-icon color="blue-darken-2" left dark v-bind="props">mdi-note-edit</v-icon>
            </template>
          </v-tooltip> -->

          <ConfirmDlg :itemId="item.id" :dialogContent="this.confirmDialogContent" @agree="deleteProduct($event)" />
        </td>
      </tr>

      <tr class="row-bg bold">
        <td :colspan="4" class="font-weight-bold text-right">Count: {{ productStore.count }}</td>
      </tr>
    </tbody>
  </v-table>

  <!-- <ul>
    <li v-for="product in productStore.products" :key="product.code">
      {{ product.name }}
    </li>
  </ul> -->

  <!-- <button type="button" class="btn btn-info" @click="getData">Get Products</button> -->
</template>

<script>
import ProductDialog from "@/components/ProductDialog.vue";
import ConfirmDlg from "@/components/ConfirmDlg.vue";
import { useProductStore } from "../stores/ProductStore";

export default {
  setup() {
    const productStore = useProductStore();
    return { productStore };
  },
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
      itemId: 0,
      confirmDialogContent: {
        btnName: "Delete",
        title: "Confirm Delete Record Id: ",
        text: "Are you sure you want to delete this record?",
      },
      productDialogContent: {
        title: "Edit Product",
      },
    };
  },
  mounted() {
    this.$axios
      .get("products")
      //.then((x) => (this.items = x.data))
      .then((x) => this.productStore.fill(x.data));
  },
  methods: {
    deleteProduct(recordId) {
      if (recordId !== 0) {
        this.$axios
          .delete("products/" + recordId)
          .then(() => this.productStore.deleteProduct(recordId))
          .then(this.$router.push("/"));
      }
    },
  },
};
</script>
<style>
#app > div > div > main > div > div.v-table.v-theme--light.v-table--density-compact > div > table > thead > tr > th {
  font-weight: 900;
}
i {
  cursor: pointer;
}

.row-bg {
  /* Set the display to `table-row` because Vuetify makes `flex` */
  display: table-row;
}

.row-bg:hover {
  /* `!important` is necessary here because Vuetify overrides this */
  background-color: #fafafa;
}
</style>
