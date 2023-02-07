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
    // Get toast interface
    const toast = useToast();
    // // or with options
    // toast.success("My toast content", {
    //   timeout: 2000
    // });
    // These options will override the options defined in the "app.use" plugin registration for this specific toast

    // Make it available inside methods
    return { toast };
  },
  methods: {
    testToast(text) {
      //this.toast("I'm a toast1111!"); 
      this.toast.error(text); 
    },
  },
  mounted() {
    // Add a request interceptor
    this.$axios.interceptors.request.use(
      (config) => {
        //Showing Vue loader before every request
        //  loader = this.$loading.show({
        //    // Optional parameters
        //    container: this.fullPage ? null : this.$refs.formContainer,
        //   canCancel: false,
        //   onCancel: this.onCancel,
        // });
        // const token = localStorage.getItem("token");
        // if (token) {
        //   config.headers.common["AUTHORIZER"] = token; //set Auth token
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    this.$axios.interceptors.response.use(
      (response) => {
        // Do something with response data
        //loader.hide(); //hiding loader on when receive response
        return response;
      },
      (error) => {
        // check for errorHandle config
        // eslint-disable-next-line no-prototype-builtins
        if (error.config?.hasOwnProperty("errorHandle") && error.config.errorHandle === false) {
          //loader.hide(); //hiding loader on error
          return Promise.reject(error);
        }
        // Do something with response error
        if (error.response?.status) {
          //loader.hide(); //hiding loader on error
          //Handling different error status using Switch case
          switch (error.response?.status) {
            case 400:
              // this.$swal(error.response.data.message, {
              //   closeOnClickOutside: false,
              // }); //showing Swal Alert
              this.testToast(error.response.data.message);
              break;
            case 401:
              // //logout user
              // this.$swal(error?.response?.data?.message, {
              //   closeOnClickOutside: false,
              // }); //showing Swal Alert
              this.testToast(error.response.data.message);
              break;
            case 403:
              // this.$swal(error.response.data.message, {
              //   closeOnClickOutside: false,
              // }); //showing Swal Alert
              this.testToast(error.response.data.message);
              break;
            case 404:
              // this.$swal(error.response.data.message, {
              //   closeOnClickOutside: false,
              // }); //showing Swal Alert
              this.testToast(error.response.data.message);
              break;
            case 500:
              // this.$swal(error.response.data.message, {
              //   closeOnClickOutside: false,
              // }); //showing Swal Alert
              this.testToast(error.response.data.message);
          }
        }
      }
    );
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
