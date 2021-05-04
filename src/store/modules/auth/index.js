import axios from 'axios'
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
      authenticated = true
    },

    SET_AUTHENTICATED (state, status) {
      state.authenticated = status
    },

    LOGOUT (state) {
      state.me = {
        name: '',
        email: '',
      }
      authenticated = true
    }
  },

  actions: {
    register ({commit}, params){
      //console.log(params)
      return axios.post('/cliente', params)
    }
  },
}
