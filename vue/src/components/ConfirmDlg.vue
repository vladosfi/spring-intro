<template>
  <v-row >
    <v-dialog max-width="50%" v-model="dialog">
      <template v-slot:activator="{ props }">
        <!-- <v-btn  color="warning" v-bind="props"> {{dialogContent.btnName}} </v-btn> -->
        <span v-bind="props">
          <v-tooltip text="Delete" location="top">
            <template v-slot:activator="{ props }">
              <v-icon color="red-darken-2" left dark v-bind="props">mdi-delete</v-icon>
            </template>
          </v-tooltip>
        </span>
      </template>
      <v-card class="width-50">
        <v-card-title class="text-h5"> {{ dialogContent.title }} {{ itemId }}</v-card-title>
        <v-card-text>{{ dialogContent.text }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click.prevent="agree"> Delete </v-btn>
          <v-btn color="primary" @click="dialog = false"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "ConfirmDlg",
  props: {
    itemId: Number,
    dialogContent: {
      btnName: String,
      title: String,
      text: String,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    agree() {
      this.dialog = false;
      this.$emit("agree", this.itemId);
    },
  },
};
</script>
<style>
div .v-row{
      display: inline;
      margin: 0;
}
</style>
