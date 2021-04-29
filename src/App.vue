<template>
  <div id="nav">
    <ul>
        <li><router-link :to="{name: 'site.home'}">Home</router-link></li>
        <li><router-link :to="{name: 'site.products'}">Loja</router-link></li>
        <li><router-link :to="{name: 'site.cart'}">Carrinho</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>
