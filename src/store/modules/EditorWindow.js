import * as types from '../mutation-types'

// initial state
const state = {
  showNavigatorArea: false,
  showUtilityArea: false
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.TOGGLE_AREA_DISPLAY] (state, { which }) {
    switch (which) {
      case 'nav':
        state.showNavigatorArea = !state.showNavigatorArea
        break
      case 'util':
        state.showUtilityArea = !state.showUtilityArea
        break
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
