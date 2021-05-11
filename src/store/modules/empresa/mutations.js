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

  SET_MESSA_EMPRESA (state, mesa){
    state.mesaSelected = mesa
  },

  REMOVE_COMPANY_SELECTED (state){
    state.companySelected = {
      name: '',
    }
    state.productsSelected = {
      data: [],
    }
    state.categoriaCompanySelected = {
      data: [],
    }

    state.mesaSelected = {
      uuid: '',
      nome: '',
      descricao: '',
    }
  },

  REMOVE_MESSA_EMPRESA (state){
    state.mesaSelected = {
      uuid: '',
      nome: '',
      descricao: '',
    }
  },
}
export default mutations
