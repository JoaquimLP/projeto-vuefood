const mutations = {
  SET_COMPANY (state, companies) {
    state.item = companies
  },

  SET_COMPANY_SELECTED (state, company){
    state.companySelected = company
  }
}
export default mutations
