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
          {{ item.code }}
        </td>
        <td>
          <ProductDialog :dialogContent="productDialogContent" :itemCode="item.code" :itemId="item.id" />
          <ConfirmDlg :itemId="item.id" :dialogContent="this.confirmDialogContent" @agree="deleteProduct($event)" />
        </td>
      </tr>

      <tr class="row-bg bold">
        <td :colspan="4" class="font-weight-bold text-right">Count: {{ productStore.count }}</td>
      </tr>
    </tbody>
  </v-table>

</template>

<script>
import ProductDialog from "@/components/ProductDialog.vue";
import ConfirmDlg from "@/components/ConfirmDlg.vue";
import { useProductStore } from "../stores/ProductStore";
import { useToast } from "vue-toastification";



export default {
  setup() {
    const productStore = useProductStore();
    const toast = useToast();
    return { productStore, toast };
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
    this.$http.get('products')
      .then((x) => this.productStore.fill(x))
      .catch((error) => this.toast.error(error));
  },
  methods: {
    deleteProduct(productId) {
      this
        .$http
        .delete("products/" + productId)
        .then(() => {
          if (productId !== 0) {
            this.productStore.deleteProduct(productId);
            this.toast.info("Product was removed!");
          }
        })
        .catch((error) => this.toast.error(error));
    },
    toaster(text) {
      this.toast.error(text);
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
