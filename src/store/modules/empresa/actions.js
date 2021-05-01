import axios from 'axios'

const RESOURCE = '/empresa'

const actions = {
  getEmpresas ({commit}) {
    //console.log(axios.get(`${RESOURCE}`));
    return axios.get(`${RESOURCE}`)
        .then(response => commit('SET_COMPANY', response.data))
  }
}

export default actions
