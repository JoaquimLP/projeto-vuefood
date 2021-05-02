<template>
  <div>
    <preloader-component></preloader-component>
    <header-component></header-component>
    <!-- Page Content -->
    <div class="container container-body">
      <router-view></router-view>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import HeaderComponent from "@/views/_partials/header";
import FooterComponent from "@/views/_partials/footer";
import PreloaderComponent from "@/views/components/Preloader";
export default {
  components: {
    HeaderComponent,
    FooterComponent,
    PreloaderComponent,
  },
};
</script>

<style scoped>
  @import url('../assets/css/vuefood.css');
  @import url('../assets/css/reset.css');
</style>
