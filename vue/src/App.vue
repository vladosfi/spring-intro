<template>
  <v-app>
    <NavMenu></NavMenu>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavMenu from "./components/NavMenu.vue";

export default {
  name: "App",
  components: {
    NavMenu,
  },
};
</script>

<style>
#app {
  html,
  body {
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* text-align: center;
  color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
