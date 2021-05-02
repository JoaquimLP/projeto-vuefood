<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <h1 class="my-4 title-tenant">Restaurantes</h1>

        <div class="row my-4">
          <div class="col-lg-4 col-md-4 col-6 mb-4" v-for="(company, index) in empresas.data"  :key="index">
            <div class="restaurant-card">
              <a href="#" @click.prevent="gotStoreCompany(company)" class="logo">
                <img class="card-img-top" v-if="company.logo" :src="company.logo" :alt="company.logo"/>
                <img class="card-img-top" v-else src="@/assets/imgs/vue-food.png" alt="company.logo"/>
              </a>
              <div class="restaurant-card-body">
                <h3>
                  <!--<router-link :to="{name: 'site.products', params: {companyFlag: company.flag}}">{{company.nome}}</router-link>-->
                  <a href="#" @click.prevent="gotStoreCompany(company)">{{company.nome}}</a>
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
import {mapActions, mapState, mapMutations} from 'vuex'
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
    ...mapActions(['getEmpresas']),

    ...mapMutations ({
      setCompany: 'SET_COMPANY_SELECTED'
    }),

    gotStoreCompany(company){
      this.setCompany(company)
      this.$router.push({name: 'site.products', params: {companyFlag: company.flag}})
    }
  }
}
</script>
