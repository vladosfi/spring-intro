<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">#</th>
        <th class="text-left">Product Name</th>
        <th class="text-left">Product Code</th>
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
      </tr>
    </tbody>
  </v-table>

  <!-- <button type="button" class="btn btn-info" @click="getData">Get Products</button> -->
</template>

<script>
import ProductDialog from "@/components/ProductDialog.vue";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {
    ProductDialog,
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
};
</script>
