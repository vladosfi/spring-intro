<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" label="Name" required></v-text-field>
    <v-text-field v-model="code" label="Product Code" required></v-text-field>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate"> Add </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "AddProduct",
};
</script>
