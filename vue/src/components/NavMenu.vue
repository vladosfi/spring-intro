<!-- <template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/product">
            <a class="nav-link active" aria-current="page" href="#">Add Product</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template> -->

<template>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-action>{{ item.title }}</v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"> </v-app-bar-nav-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <ProductDialog :dialogContent="dialogContent" />
      </v-toolbar-items>
    </v-toolbar>

</template>

<script>
import ProductDialog from "@/components/ProductDialog.vue";

export default {
  name: "NavMenu",
  props: {
    msg: String,
  },
  components: {
    ProductDialog
  },
  data() {
    return {
      appTitle: "Product App",
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/", icon: "mdi-home-circle" },
        { title: "Add Product", path: "/product", icon: "mdi-plus-circle" },
      ],
      dialogContent: {
        title: "Add Product",
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
}
</style>
