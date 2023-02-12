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
import { useToast } from "vue-toastification";

export default {
  name: "App",
  components: {
    NavMenu,
  },
  setup() {
    const toast = useToast();
    // Make it available inside methods
    return { toast };
  },
  methods: {
    toaster(text) {
      //this.toast("I'm a toast1111!");
      this.toast.error(text);
    },
  },
  mounted() {
  },
}
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
