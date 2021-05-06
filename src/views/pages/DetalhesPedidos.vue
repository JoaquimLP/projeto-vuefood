<template>
  <div>
    <div class="row my-4 mx-0 details">
      <div class="col-12 mb-2">
        <h1 class="title-tenant h2">
          Detalhes do Pedido <strong>{{identify}}</strong>
        </h1>
      </div>
      <div class="col-sm-6">
        <ul class="p-0">
          <li><b>Número:</b> {{identify}}</li>
          <li><b>Total:</b> {{meusPedidos.total}}</li>
          <li><b>Data:</b> {{meusPedidos.date}}</li>
          <li>
            <b>Status:</b>
            <span class="badge bg-success text-light p-2">{{meusPedidos.status}}</span>
          </li>
        </ul>
      </div>
      <div class="col-sm-6">
        <ul class="p-0">
          <li v-if="meusPedidos.mesa.nome">
            <span>Mesa</span>
            <ul class="p-0">
              <li><b>Identificador:</b> {{meusPedidos.mesa.nome}}</li>
              <li><b>Descrição:</b> {{meusPedidos.mesa.descricao}}</li>
            </ul>
          </li>
          <li v-if="meusPedidos.cliente.name">
            <span>Cliente</span>
            <ul class="p-0">
              <li><b>Nome:</b> {{meusPedidos.cliente.name}}</li>
              <li><b>E-mail:</b> {{meusPedidos.cliente.email}}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- details order -->
    <hr />
    <div class="row my-4">
      <div class="col-12">
        <h4>Produtos</h4>
      </div>

      <div class="col-12 col-md-6 col-lg-4 my-1" v-for="(produto, index) in meusPedidos.produtos" :key="index">
        <div class="details-card">
          <a href="#"><img class="card-img-top" :src="produto.image" :alt="produto.produto"></a>
          <div class="details-card-body">
            <h5>{{produto.produto}}</h5>
            <p><b>R$: {{produto.preco}}</b></p>
          </div>
        </div>
      </div>
    </div>
    <!-- products order -->
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
export default {
  props:['identify'],
  created() {
    this.getDetalhesPedido(this.identify).then(response => {
      this.meusPedidos = Object.assign(this.meusPedidos, response.data.data)
    }).catch(response => {
      this.$toast.error("Fallha ao carregar detlahes do pedidos");
      return this.$router.push({name: 'site.home'})
    })
  },

  data() {
    return {
      meusPedidos: {
        identify: '',
        date: '',
        mesa: '',
        status: '',
        total: '',
        mesa: {
          identify: '',
          nome: '',
        },
        cliente: {
          name: '',
          email: '',
        },
        empresa: {
          nome: '',
          logo: '',
        },
        produtos: [],
        avaliacao: [],
      }
    }
  },

  methods: {
    ...mapActions([
      'getDetalhesPedido'
    ]),
  },

}
</script>
