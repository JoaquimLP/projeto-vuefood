import axios from 'axios'
require('promise.prototype.finally').shim();

const RESOURCE = '/empresa'

const actions = {
  getEmpresas ({commit}) {
    commit('SET_PRELOADER', true)
    commit('SET_TEXTPRELOADER', 'Carregando as empresas...')
    return axios.get(`${RESOURCE}`)
      .then(response => commit('SET_COMPANY', response.data))
      .finally(() => commit('SET_PRELOADER', false))
  },

  getEmpresaByToken ({commit}, token){
    commit('SET_PRELOADER', true)
    commit('SET_TEXTPRELOADER', 'Carregando a empresa...')

    return axios.get(`${RESOURCE}/${token}`)
      .then(response => commit('SET_COMPANY_SELECTED', response.data.data))
      .finally(() => commit('SET_PRELOADER', false))
  },

  getCategoriesByCompany ({commit}, token) {
    //console.log(token)
    commit('SET_PRELOADER', true)
    commit('SET_TEXTPRELOADER', 'Carregando as empresas...')
    return axios.get(`/categoria`, {params: {token}})
        .then(response => commit('SET_CATEGORIA_COMPANY', response.data))
        .finally(() => commit('SET_PRELOADER', false))
  },

  getProductByCompany ({commit}, params) {
    commit('SET_PRELOADER', true)
    commit('SET_TEXTPRELOADER', 'Carregando as empresas...')
    return axios.get(`/produto`, {params})
        .then(response => commit('SET_PRODUCT_COMPANY', response.data))
        .finally(() => commit('SET_PRELOADER', false))
  },

  getMesaFromEmpresa({commit}, params){
    commit('SET_PRELOADER', true)
    commit('SET_TEXTPRELOADER', 'Carregando a empresa...')

    return axios.get(`/mesa/${params.mesa}`,  {params})
      .then(response => {
        commit('SET_MESSA_EMPRESA', response.data.data)
      })
      .finally(() => commit('SET_PRELOADER', false))
  }
}

export default actions
