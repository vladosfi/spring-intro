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
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
      </tr>
    </tbody>
  </table>

  <button type="button" class="btn btn-info" @click="getData">Get Products</button>

  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
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
      items: [
        { name: "dal", id: "15" },
        { name: "rice", id: "23" },
      ],
      getData() {
        // alert(event.target.tagName);
        this.$axios.get("users").then((x) => console.log(x.data));
      }
    };
    },
  mounted() {
    this.$axios.get('users')
      .then(x => console.log(x.data))
  }
};
</script>
