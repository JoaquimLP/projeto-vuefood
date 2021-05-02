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
    }, 2000);
  }
}

export default actions
