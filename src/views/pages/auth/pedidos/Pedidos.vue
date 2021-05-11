<template>
  <div>
    <div class="my-4">
      <h1 class="title-tenant">Meus Pedidos</h1>
    </div>

    <div class="my-orders my-4">
      <div class="my-table-header mb-4">
        <div class="text-center"><b>Nª Pedido</b></div>
        <div class="text-center"><b>Data</b></div>
        <div class="text-center"><b>Valor Total</b></div>
        <div class="text-center"><b>Detalhes</b></div>
      </div>

      <div class="my-table" v-for="(pedido, index) in pedidos" :key="index">
        <div class="text-center">{{pedido.identify}}</div>
        <div class="text-center">{{$filters.formatDate(pedido.date)}}</div>
        <div class="text-center">{{$filters.formatPrice(pedido.total)}}</div>
        <div class="text-center">
          <router-link :to="{name: 'site.pedidos', params: {identify: pedido.identify}}" class="btn btn-danger">Detalhes</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
export default {
 computed: {

    ...mapState({
      pedidos: state => state.pedido.meusPedidos,
      authenticated: state => state.auth.authenticated
    })

  },

  created() {
    if(this.authenticated != true){
      return this.$router.push({name: 'site.home'})
    }
    this.getMeusPedidos().catch(response => {this.$toast.error("Fallha ao carregar os pedidos")});
  },

  methods: {
    ...mapActions([
      'getMeusPedidos'
    ]),
  },
}
</script>
