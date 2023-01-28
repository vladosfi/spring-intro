<template>
    <Table></Table>
</template>

<script>
import Table from "@/components/Table.vue";
import ConfirmDlg from "@/components/ConfirmDlg.vue";

/* eslint-disable */
export default {
  name: "Home",
  components: {
    Table,
    ConfirmDlg,
  },
  data() {
    return {
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
