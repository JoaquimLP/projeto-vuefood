export const state = {
  preloader: false,
  textPreloader: 'Carregando...'
}

export const mutations = {
  SET_PRELOADER (state, status){
    state.preloader = status
  },

  SET_TEXTPRELOADER (state, text){
    state.textPreloader = 'Carregando...'
  }
}
console.log(state)
