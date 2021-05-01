import { createStore } from 'vuex'
import empresa from './modules/empresa'

// Cria uma nova instância do store.
const store = createStore({
  modules: {
    empresa
  }
})

export default store
