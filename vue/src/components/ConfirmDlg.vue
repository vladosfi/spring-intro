<template>  
    <v-row justify="center">
      <v-dialog max-width="50%" v-model="dialog">
        <template v-slot:activator="{ props }">
          <v-btn :disabled="dialogContent.disableEdit" color="warning" v-bind="props"> {{dialogContent.btnName}} </v-btn>
          
        </template>
        <v-card class="width-50">
          <v-card-title class="text-h5"> {{ dialogContent.title }} </v-card-title>
          <v-card-text>{{ dialogContent.text }} {{ dialogContent.disableEdit }}</v-card-text>
          <v-card-actions>            
            <v-spacer></v-spacer>
            <v-btn color="warning" @click.prevent="agree"> Delete </v-btn>
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
    dialogContent: {
      btnName: String,
      title: String,
      text: String,
      disableEdit: Boolean,
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
      this.$emit('agree', true);
    }
  },
};
</script>
<style>
</style>
