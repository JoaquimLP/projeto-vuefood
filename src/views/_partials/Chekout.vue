<template>
  <div>
    <a href="" class="cart-finalizar" @click.prevent="modal.show()">Finalizar</a>
    <div class="modal fade" ref="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="" v-if="loading">
          <div class="modal-content">
            <p>Gerando o pedido... (Aguarde!)</p>
          </div>
        </div>
        <div class="" v-else>
          <div class="modal-content" v-if="user.email != ''">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Finalizando Pedido</h5>
              <button type="button" class="btn-close" @click.prevent="modal.hide()" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="col-12">
                <p><strong>Total de produtos:</strong> {{products.length}}</p>
                <p><strong>Preco total:</strong> {{totalCart}}</p>
                <div class="form-group">
                  <div class="mb-3">
                    <textarea name="comentario" v-model="comentario" class="form-control" id="" cols="30" rows="2" placeholder="Comentario (opcional)"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click.prevent="modal.hide()">Close</button>
              <button type="button" class="btn btn-primary" @click.prevent="createNewPedido">Fazer pedido</button>
            </div>
          </div>
          <div class="modal-content" v-else>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Finalizando Pedido</h5>
              <button type="button" class="btn-close" @click.prevent="modal.hide()" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-6">
                  <p><strong>Total de produtos:</strong> {{products.length}}</p>
                  <p><strong>Preco total:</strong> {{totalCart}}</p>
                  <div class="form-group">
                    <div class="mb-3">
                      <textarea name="comentario" v-model="comentario" class="form-control" id="" cols="30" rows="2" placeholder="Comentario (opcional)"></textarea>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <router-link :to="{name: 'auth.login'}" class="btn btn-info btn-full" @click.prevent="modal.hide()">Fazer Login</router-link>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click.prevent="modal.hide()">Close</button>
              <button type="button" class="btn btn-primary" @click.prevent="createNewPedido">Fazer Pedido de forma anônima</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import { Modal } from 'bootstrap'
import StarRating from 'vue-star-rating'
export default {
  components:{
    StarRating
  },
  computed:{
    ...mapState({
      products: (state) => state.cart.procucts,
      user: state => state.auth.me,
      authenticated: state => state.auth.authenticated,
      company: state => state.empresa.companySelected,
    }),

    totalCart () {
      let total = 0
      this.products.map((itemCart, index) => {
        total += (itemCart.qtd * itemCart.product.preco)
      })
      return total
    },

  },

  data: () => ({
    modal: null,
    comentario: '',
    loading: false,

  }),

  mounted() {
    this.modal = new Modal(this.$refs.exampleModal)
  },

  methods: {
    ...mapActions([
      'createPedido', 'createPedidoAuth'
    ]),

    createNewPedido(){
      this.loading = true;
      const actions = this.user.email == '' ? 'createPedido' : 'createPedidoAuth'

      let params = {
        token : this.company.uuid,
        comentario: this.comentario,
        produto: [
          ...this.products
        ]

      }
      this.$store.dispatch(actions, params)
        .then(response => {
          this.$toast.success("Pedido realizado com sucesso");
           this.$router.push({name: 'site.pedidos', params: {identify: response.identify}});
        })
        .catch(error => {
          console.log(error.response)
          this.$toast.error("Ocorreu uma falha ao realizar o pedido");
        }).finally(() => {
          this.loading = false
          this.modal.hide()
        })
    }

  },

}
</script>
