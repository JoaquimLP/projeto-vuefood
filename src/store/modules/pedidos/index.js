import axios from 'axios'
import {TOKEN_NAME} from '@/configs/api'
require('promise.prototype.finally').shim();

const state = {
  meusPedidos: {
    data: []
  },
}

const  mutations = {
  SET_PEDIDOS (state, pedido) {
    state.meusPedidos = pedido
  },

  SET_PEDIDO (state, pedido) {
    state.meusPedidos.data = pedido
  },

}

const actions = {
  getMeusPedidos ({commit}) {
    commit('SET_PRELOADER', true)
    commit('SET_TEXTPRELOADER', 'Carregando os pedidos...')
    const token = localStorage.getItem(TOKEN_NAME)
    if(!token){
      Promise.reject();
    }

    return axios.get('/auth/orders/my-orders', {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    .then(reponse => {
      commit('SET_PEDIDOS', reponse.data.data)
    })
    .catch((error) => {
      localStorage.removeItem(TOKEN_NAME)
    }).finally(() => commit('SET_PRELOADER', false))
  }
}

console.log(state)

export default {
  state, mutations, actions
}
