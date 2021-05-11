<template>
    <div>
      <!-- About Tenant and Categories -->
    <h1 class="my-4 title-tenant text-center">{{company.nome}}</h1>
    <h2 v-if="mesa.nome">Mesa: {{mesa.nome}} <a href="#" @click.prevent="removerMesa">x</a></h2>
    <div class="row">


        <div class="list-categories">
          <a href="#" :class="['list-categories__item', categoriaInFilter('') ]"  @click.prevent="filterByCategoria('')"><div class="icon"><i class="fas fa-pizza-slice"></i> </div> <span> Todas</span> </a>
          <a href="#" :class="['list-categories__item', categoriaInFilter(categoria.uuid) ]" v-for="(categoria, index) in categorias.data"  :key="index"
            @click.prevent="filterByCategoria(categoria.uuid)"><div class="icon"><i class="fas fa-pizza-slice"></i> </div> <span> {{categoria.nome}} </span> </a>
          <!--<a href="#" class="list-categories__item active"><div class="icon"><i class="fas fa-pizza-slice"></i> </div> <span> Pizza </span> </a>
          <a href="#" class="list-categories__item active"><div class="icon"><i class="fas fa-hamburger"></i> </div> <span> Sanduiche </span> </a>
          <a href="#" class="list-categories__item active"><div class="icon"><i class="fas fa-ice-cream"></i> </div> <span> Sorvetes </span> </a>-->
        </div>

    </div>
    <!-- Cards Produtos -->
    <div class="row my-4">

      <div class="col-lg-4 col-md-6 mb-4" v-for="(produto, index) in products.data" :key="index">
        <div class="card--flat h-100">
          <a href="#">
            <div class="card-image">
              <img class="card-img-top" :src="produto.image" :alt="produto.image">
            </div>
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">{{produto.nome}}</a>
            </h4>
            <h5>R$ {{produto.preco}}</h5>
            <p class="card-text">{{produto.descricao}}</p>
          </div>
          <div :class="['card-footer', 'card-footer-custom', {'disabled': productInCart(produto)}]">
          <!--<router-link :to="{name: 'site.cart'}"></router-link>-->
            <span v-if="productInCart(produto)"> Adicionar no Carrinho <i class="fas fa-cart-plus"></i></span>
            <a v-else href="#" @click.prevent="addProdCart(produto)">
              Adicionar no Carrinho <i class="fas fa-cart-plus"></i>
            </a>
          </div>
        </div>
      </div>

    </div>
    <!-- /.row -->
    </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
export default {
  props: ['companyFlag'],

  created () {
    if(this.company.name == ""){
      return this.$router.push({name: 'site.home'})
    }

    this.getCategoriesByCompany(this.company.uuid).catch(response => {
        this.$toast.error("Fallha ao carregar as as categorias");
      })

    // this.getProductByCompany(this.company.uuid).catch(response => {
        // this.$toast.error("Fallha ao carregar as as categorias");
      // })

    this.loadProdutos()
  },

  computed: {

    ...mapState({
      company: state => state.empresa.companySelected,
      mesa: state => state.empresa.mesaSelected,
      categorias: state => state.empresa.categoriaCompanySelected,
      products: state => state.empresa.productsSelected,

      productCart: state => state.cart.procucts,
    })

  },

  data () {
    return {
      filters: {
        categoria: '',
      }
    }
  },

  methods: {
    ...mapActions([
      'getCategoriesByCompany', 'getProductByCompany'
    ]),

    ...mapMutations({
      addProdCart: 'ADD_PRODUCT_CART',
      removerMesa: 'REMOVE_MESSA_EMPRESA',
    }),

    loadProdutos (){
      const params = {
        token: this.company.uuid,

      }
      //console.log(this.filters.categoria)
      if (this.filters.categoria != "") {
        params.categoria = [
          this.filters.categoria
        ]
      }
      this.getProductByCompany(params).catch(response => {
        this.$toast.error("Fallha ao carregar as as categorias");
      })
    },

    filterByCategoria(categoria) {
      this.filters.categoria = categoria
      this.loadProdutos()
    },

    categoriaInFilter(categoria) {
      return categoria == this.filters.categoria ? 'active_item' : ''
    },

    productInCart(product){
      let inCart = false
      this.productCart.map((prodCart, index) => {
        if(prodCart.identify === product.identify){
          inCart = true
        }
      })
      return inCart
    }
  },
}
</script>
