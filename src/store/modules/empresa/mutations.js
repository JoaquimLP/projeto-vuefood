const mutations = {
  SET_COMPANY (state, companies) {
    state.item = companies
  },

  SET_COMPANY_SELECTED (state, company){
    state.companySelected = company
  },

  SET_CATEGORIA_COMPANY (state, categoria){
    state.categoriaCompanySelected = categoria
  },

  SET_PRODUCT_COMPANY (state, product){
    state.productsSelected = product
  },
}
export default mutations
