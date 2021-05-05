import axios from 'axios'
import {TOKEN_NAME} from '@/configs/api'
require('promise.prototype.finally').shim();

export default {
  state: {
    me: {
      name: '',
      email: '',
    },
    authenticated: false,
  },
  mutations: {
    SET_ME (state, me) {
      state.me = me
      state.authenticated = true
    },

    SET_AUTHENTICATED (state, status) {
      state.authenticated = status
    },

    LOGOUT (state) {
      state.me = {
        name: '',
        email: '',
      }
      state.authenticated = true
    }
  },

  actions: {
    register ({commit}, params){
      return axios.post('/cliente', params)
    },

    login({commit, dispatch}, params){
      return axios.post('/sanctum/token', params)
        .then(reponse => {
          const token = reponse.data.token
          localStorage.setItem(TOKEN_NAME, token)
          dispatch('getMe')
        })
    },

    getMe({commit}){
      const token = localStorage.getItem(TOKEN_NAME)
      if(!token){
        return;
      }

      return axios.get('/auth/me', {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      }).then(reponse => {
        commit('SET_ME', reponse.data.data)
      }).catch((error) => {
        localStorage.removeItem(TOKEN_NAME)
      })
    },

    logout({commit}){
      const token = localStorage.getItem(TOKEN_NAME)
      if(!token){
        return;
      }

      return axios.post('/auth/logout', {}, {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      }).then(reponse => {
        commit('LOGOUT')
        localStorage.removeItem(TOKEN_NAME)
      }).catch((error) => {
        localStorage.removeItem(TOKEN_NAME)
      })
    },
  },
}
