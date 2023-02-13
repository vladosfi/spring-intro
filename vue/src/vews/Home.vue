<template>
  <v-card>
    <v-layout>
      <v-app-bar class="d-flex justify-space-evenly mb-6" title="Product List">
            <div><ProductDialog :dialogContent="dialogContent" /></div>
      </v-app-bar>

      <v-main style="min-height: 300px">
        <Table></Table>

      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import Table from "@/components/Table.vue";
import ConfirmDlg from "@/components/ConfirmDlg.vue";
import ProductDialog from "@/components/ProductDialog.vue";

/* eslint-disable */
export default {
  name: "Home",
  components: {
    Table,
    ConfirmDlg,
    ProductDialog,
  },
  data() {
    return {
      dialogContent: {
        title: "Add Product",
      },
    };
  },
  methods: {},
  // ,
  // mounted() {
  //   this.$axios.get('users')
  //     .then(x => console.log(x.data))
  // }
};
</script>

<style>
/* .v-btn {
  text-align: right;
} */

#app > div > div > main > div > div > div.v-layout > header > div > div.d-flex.flex-row-reverse > button{
  background-color: #fafafa;
}
</style>
