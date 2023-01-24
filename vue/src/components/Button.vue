<template>
  <v-app>
    <v-row class="ma-4 justify-space-around">
      <v-btn>Button</v-btn>
      <v-btn color="red">Button</v-btn>
      <v-btn color="green" dark>Button</v-btn>
    </v-row>
  </v-app>
</template>
<script>
  export default {
    components: {  },
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Button'
  }
</script>