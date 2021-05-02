import { createStore } from 'vuex'
import empresa from './modules/empresa'
import {state, mutations} from './modules/default'
import cart from './modules/cart/cart'

// Cria uma nova instância do store.
const store = createStore({
  modules: {
    empresa,
    cart,
  },
  state,
  mutations
})

export default store
