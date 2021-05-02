import axios from 'axios'

const RESOURCE = '/empresa'

const actions = {
  getEmpresas ({commit}) {
    commit('SET_PRELOADER', true)
    commit('SET_TEXTPRELOADER', 'Carregando as empresas...')
    setTimeout(() => {
      return axios.get(`${RESOURCE}`)
      .then(response => commit('SET_COMPANY', response.data))
      .finally(() => commit('SET_PRELOADER', false))
    }, 1000);
  },

  getCategoriesByCompany ({commit}, token) {
    console.log(token)
    commit('SET_PRELOADER', true)
    commit('SET_TEXTPRELOADER', 'Carregando as empresas...')
    setTimeout(() => {
      return axios.get(`/categoria`, {params: {token}})
        .then(response => commit('SET_CATEGORIA_COMPANY', response.data))
        .finally(() => commit('SET_PRELOADER', false))
    }, 1000);
  },

  getProductByCompany ({commit}, params) {
    commit('SET_PRELOADER', true)
    commit('SET_TEXTPRELOADER', 'Carregando as empresas...')
    setTimeout(() => {
      return axios.get(`/produto`, {params})
        .then(response => commit('SET_PRODUCT_COMPANY', response.data))
        .finally(() => commit('SET_PRELOADER', false))
    }, 1000);
  },
}

export default actions
