import axios from 'axios'
import {TOKEN_NAME} from '@/configs/api'
import 'core-js/features/promise';
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
  },

  getDetalhesPedido ({commit}, identfy) {
    commit('SET_PRELOADER', true)
    commit('SET_TEXTPRELOADER', 'Carregando...')

    return axios.get(`/orders/${identfy}`).finally(() => commit('SET_PRELOADER', false))
  },

  aviacaoPedido({commit}, params){
    const token = localStorage.getItem(TOKEN_NAME)
    if(!token){
      Promise.reject();
    }
    return axios.post(`/auth/${params.identify}/avaliacao`, params, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
  },

  createPedido({commit}, params){
    return new Promise((resolve, reject) => {

      axios.post(`/create-orders`, params)
        .then(reponse => {
          commit('CLEAR_CART')
          resolve(reponse.data.data)
        })
        .catch(reponse => reject(reponse.error))
        .finally(() => commit('SET_PRELOADER', false))
    })
  },

  createPedidoAuth({commit}, params){
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem(TOKEN_NAME)
      if(!token){
        reject();
      }

      axios.post(`/auth/create-orders`, params, {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        .then(reponse => {
          commit('CLEAR_CART')
          resolve(reponse.data.data)
        })
        .catch(reponse => reject(reponse.error))
        .finally(() => commit('SET_PRELOADER', false))
    })


  },
}

//console.log(state)

export default {
  state, mutations, actions
}
