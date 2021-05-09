export default {
  state: {
    procucts: [],
  },
  actions: {

  },
  mutations: {
    ADD_PRODUCT_CART (state, product) {
      state.procucts.push({
        qtd: 1,
        identify: product.identify,
        product,
      })
    },

    REOMOVE_PRODUCT_CART (state, product) {
      state.procucts = state.procucts.filter((value, index) => {
        return value.identify !== product.identify
      })
    },

    INCREMENT_QTY_PRODUCT_CART (state, product) {
      state.procucts = state.procucts.map((value, index) => {
        if(value.identify == product.identify){
          state.procucts[index].qtd ++
        }

        return state.procucts[index]
      })
    },

    DECREMENT_QTY_PRODUCT_CART (state, product) {
      state.procucts = state.procucts.filter((value, index) => {
        if(value.identify == product.identify){
          state.procucts[index].qtd =  state.procucts[index].qtd - 1
        }

        if ( state.procucts[index].qtd > 0) {
          return state.procucts[index]
        }
      })
    },

    CLEAR_CART (state) {
      state.procucts = []
    },
  },
}
