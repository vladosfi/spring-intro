<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Product Name</th>
        <th scope="col">Product Code</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.name }}</td>
        <td>{{ item.id }}</td>
      </tr>
    </tbody>
  </table>

  <!-- <button type="button" class="btn btn-info" @click="getData">Get Products</button> -->
</template>

<script>
import { reactive } from "vue";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { reactive },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Table",
  data() {
    return {
      //  getData() {
      //    this.$axios.get("users").then((x) => console.log(x.data));
      // }
      items: {}
    };
    },
  mounted() {
    this.$axios.get('users')
      .then(x => this.items = x.data)
      .catch((error) => console.log(error))
  }
};
</script>
