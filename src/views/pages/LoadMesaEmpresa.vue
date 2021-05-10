<template>
  <div>
    <p>carregando dados, aguarde!</p>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'

export default {
  props: [
    'token', 'token_table'
  ],

  computed: {

    ...mapState({
      company: state => state.empresa.companySelected,
    })

  },

  created() {
    this.getEmpresaByToken(this.token)
      .then(response => {
        const params = {
          token: this.token,
          mesa: this.token_table,
        }
        this.getMesaFromEmpresa(params)
          .then(response => {
            this.$toast.success("loja carregada com sucesso");//
          })
          .catch(error => {
            console.log(error.response)
            this.$toast.error("Fallha ao carregar a mesa")
          })
          .finally(() => this.$router.push({name: 'site.products', params:{companyFlag: this.company.flag}}))
      }).catch(response => {
        this.$toast.error("Fallha ao carregar a empresa")
        return this.$router.push({name: 'site.home'})
      })
  },


  methods: {
    ...mapActions(['getEmpresaByToken', 'getMesaFromEmpresa']),

    /* gotStoreCompany(company){
      this.setCompany(company)
      this.$router.push({name: 'site.products', params: {companyFlag: company.flag}})
    } */
  },
}
</script>
