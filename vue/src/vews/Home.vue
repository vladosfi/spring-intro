<template>
    <Table></Table>
    <ProductDialog :dialogContent="dialogContent" />
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
  methods: {
  },
  // ,
  // mounted() {
  //   this.$axios.get('users')
  //     .then(x => console.log(x.data))
  // }
};
</script>

<style></style>
