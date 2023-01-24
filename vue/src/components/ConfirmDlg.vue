<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"> Use Google's location service? </v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-1" variant="text"  @click.prevent="disagree"> Disagree </v-btn>
          <v-btn color="green-darken-1" variant="text" @click.prevent="agree"> Agree </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
@click.prevent="deleteProduct"

<script>
export default {
  name: "ConfirmDlg",
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    agree() {
      this.dialog = false;
      console.log('Agree');
    },
    disagree() {
      this.dialog = false;
      console.log('Disagree');
    },
  },
};
</script>
