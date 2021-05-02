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
        uuid: product.uuid,
        product,
      })
    },

    REOMOVE_PRODUCT_CART (state, product) {
      state.procucts.filters((value, index) => {
        return value.uuid != product.uuid
      })
    },

    INCREMENT_QTY_PRODUCT_CART (state, product) {
      state.procucts = state.procucts.map((value, index) => {
        if(value.uuid == product.uuid){
          state.procucts[index].qtd ++
        }

        return state.procucts[index]
      })
    },

    DECREMENT_QTY_PRODUCT_CART (state, product) {
      state.procucts = state.procucts.filters((value, index) => {
        if(value.uuid == product.uuid){
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
