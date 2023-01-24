<template>
  <div class="container">
    <Table></Table>
    <ConfirmDlg />
  </div>

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
      dialog: true,
    };
  },
  methods: {
      async delRecord() {
        if (
          await this.$refs.confirm.open(
            "Confirm",
            "Are you sure you want to delete this record?"
          )
        ) {
          this.deleteRecord();
        }
      },
      deleteRecord() {
        console.log("Record deleted.");
      },
    },
  // ,
  // mounted() {
  //   this.$axios.get('users')
  //     .then(x => console.log(x.data))
  // }
};
</script>

<style></style>
