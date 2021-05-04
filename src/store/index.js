require('promise.prototype.finally').shim()
import { createStore } from 'vuex'
import empresa from './modules/empresa'
import {state, mutations} from './modules/default'
import cart from './modules/cart/cart'
import auth from './modules/auth'

// Cria uma nova instância do store.
const store = createStore({
  modules: {
    empresa,
    cart,
    auth,
  },
  state,
  mutations
})

export default store
