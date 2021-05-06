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
          <li><b>Total:</b> {{pedido.total}}</li>
          <li><b>Data:</b> {{pedido.date}}</li>
          <li>
            <b>Status:</b>
            <span class="badge bg-success text-light p-2">{{pedido.status}}</span>
          </li>
        </ul>
      </div>
      <div class="col-sm-6">
        <ul class="p-0">
          <li v-if="pedido.mesa.nome">
            <span>Mesa</span>
            <ul class="p-0">
              <li><b>Identificador:</b> Não Informado</li>
              <li><b>Descrição:</b> Não Informado</li>
            </ul>
          </li>
          <li>
            <span>Cliente</span>
            <ul class="p-0">
              <li><b>Nome:</b> Carlos</li>
              <li><b>E-mail:</b> carlos@especializati.com.br</li>
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

      <div class="col-12 col-md-6 col-lg-4 my-1">
        <div class="details-card">
          <a href="vitrine-tenant.html"
            ><img class="card-img-top" src="imgs/pizza.png" alt=""
          /></a>
          <div class="details-card-body">
            <h5>Pizza</h5>
            <p><b>R$: 10,00</b></p>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-4 my-1">
        <div class="details-card">
          <a href="vitrine-tenant.html"
            ><img class="card-img-top" src="imgs/pizza.png" alt=""
          /></a>
          <div class="details-card-body">
            <h5>Pizza</h5>
            <p><b>R$: 10,00</b></p>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-4 my-1">
        <div class="details-card">
          <a href="vitrine-tenant.html"
            ><img class="card-img-top" src="imgs/pizza.png" alt=""
          /></a>
          <div class="details-card-body">
            <h5>Pizza</h5>
            <p><b>R$: 10,00</b></p>
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
    console.log(this.identify)
  },

  data() {
    return {
      pedido: {
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
        produto: [],
        avaliacao: [],
      }
    }
  },

}
</script>
