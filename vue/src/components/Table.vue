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
import { useToast } from "vue-toastification";
import Api from "@/services/ApiService";

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

      sortBy: [{ key: 'calories', order: 'asc' }],
        headers: [
          {
            title: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            key: 'name',
          },
          { title: 'Calories', key: 'calories' },
          { title: 'Fat (g)', key: 'fat' },
          { title: 'Carbs (g)', key: 'carbs' },
          { title: 'Protein (g)', key: 'protein' },
          { title: 'Iron (%)', key: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 200,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 200,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 300,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 300,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 400,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 400,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 400,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 400,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 500,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 500,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      


    };
  },
  mounted() {
    Api.posts
      .list()
      .then((x) => this.productStore.fill(x))
      .catch((error) => this.toast.error(error.response.data.apierror.message));
    // this.$axios.get("products").then((x) => (this.items = x.data));
  },
  methods: {
    deleteProduct(productId) {
      Api.posts
        .remove(productId)
        .then(() => {
          if (productId !== 0) {
            this.productStore.deleteProduct(productId);
            this.toast.info("Product was removed!");
          }
        })
        .catch((error) => this.toast.error(error.response.data.apierror.message));
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
