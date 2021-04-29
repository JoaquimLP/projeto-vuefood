<template>
    <div id="nav">
      <header-component></header-component>
        <!-- Page Content -->
      <div class="container container-body">
        <router-view></router-view>
      </div>
      <footer-component></footer-component>
    </div>
</template>

<script>
import HeaderComponent from '@/views/_partials/header'
import FooterComponent from '@/views/_partials/footer'
export default {
    components:{
        HeaderComponent,
        FooterComponent,
    },
}
</script>
