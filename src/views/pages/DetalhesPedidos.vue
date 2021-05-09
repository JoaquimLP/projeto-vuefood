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

    <hr>
    <button class="btn btn-success" v-if="user.email != '' && user.email == meusPedidos.cliente.email && this.meusPedidos.avaliacao.length == 0"
      data-bs-toggle="modal" data-bs-target="#avalicao">
      Avaliar o pedido
    </button>

    <!-- Modal -->
    <div class="modal fade" id="avalicao" tabindex="-1" aria-labelledby="avalicaoLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="avalicaoLabel">Avaliar o pedido {{identify}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <star-rating v-bind:increment="1"
                      v-model="avaliacao.stars"
                      :rating="avaliacao.stars"
                      v-bind:max-rating="5"
                      inactive-color="#999999"
                      shadow-color="ffff00"
                      active-color="#ffdd00"
                      @hover:rating="mouseOverRating = $event"
                      v-bind:star-size="20">
          </star-rating>
          <textarea class="mt-4" name="comment" id="" cols="30" rows="3" v-model="avaliacao.comentario" placeholder="Comentário"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click.prevent="setAvalicao" :disabled="loadSendAvalicao">
              <span v-if="loadSendAvalicao">Carregando....</span>
              <span v-else>Avaliar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12" v-if="this.meusPedidos.avaliacao.length > 0">
      <div v-for="(avaliacao, index) in this.meusPedidos.avaliacao" :key="index">
        <p>Nome: <strong>{{meusPedidos.cliente.name}}</strong></p>
        <p>Comentario: <strong>{{avaliacao.comentario}}</strong></p>
        <star-rating v-bind:increment="1"
                    :rating="avaliacao.stars"
                    v-bind:max-rating="5"
                    inactive-color="#999999"
                    shadow-color="ffff00"
                    active-color="#ffdd00"
                    :read-only="true"
                    v-bind:star-size="20">
        </star-rating>
      </div>
    </div>
    <!--Avalição-->
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import { Modal } from 'bootstrap'
import StarRating from 'vue-star-rating'
export default {

  props:['identify'],
  components:{
    StarRating
  },
  computed:{
    ...mapState({
      user: state => state.auth.me
    }),
  },
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
      },
      avaliacao: {
        stars: 1,
        comentario: '',
      },
      loadSendAvalicao: false,
      mouseOverRating: null,
    }
  },

  methods: {
    setRating: function(rating){
      this.avaliacao.stars= rating;
    },
    ...mapActions([
      'getDetalhesPedido', 'aviacaoPedido'
    ]),

    show () {
      this.modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    },

    setAvalicao() {
      let stars =  this.mouseOverRating
      this.avaliacao.stars = stars
      this.loadSendAvalicao = true
      const params = {
        identify : this.identify,
        stars: this.avaliacao.stars,
        comentario: this.avaliacao.comentario
      }
      this.aviacaoPedido(params)
        .then((response) => {
          this.$toast.success("Pedido avaliado com sucesso");//
          this.meusPedidos.avaliacao.push(response.data.data)
        })
        .catch(response => {this.$toast.error("Fallha ao avaliar pedido")})
        .finally(() => this.loadSendAvalicao = false)
    }

  },

}
</script>
