<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <h1 class="my-4 title-tenant">Restaurantes</h1>

        <div class="row my-4">
          <div class="col-lg-4 col-md-4 col-6 mb-4" v-for="(company, index) in empresas.data"  :key="index">
            <div class="restaurant-card">
              <router-link :to="{name: 'site.products'}" class="logo">
                <img class="card-img-top" v-if="company.logo" :src="company.logo" :alt="company.logo"/>
                <img class="card-img-top" v-else src="@/assets/imgs/vue-food.png" alt="company.logo"/>
              </router-link>
              <div class="restaurant-card-body">
                <h3>
                  <router-link :to="{name: 'site.products'}">{{company.nome}}</router-link>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <!-- /.row -->
      </div>
      <!-- /.col-lg-9 -->
    </div>
    <!-- /.row -->
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  mounted() {
    this.getEmpresas()
      .catch(response => {
        this.$toast.error("Fallha ao carregar as empresas");
      })
  },

  computed: {
   /*  empresas () {
      return this.$store.state.empresa.item
    } */

    ...mapState({
      empresas: state => state.empresa.item
    })
  },
  methods: {
    ...mapActions(['getEmpresas'])
  }
}
</script>
