import * as types from '../mutation-types'

// initial state
const state = {
  showObjectLibrary: true,
  showMediaLibrary: false
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.UTIL_AREA_SWITCH_TAB] (state, { which }) {
    console.log(which)
    switch (which) {
      case 'obj':
        state.showObjectLibrary = true
        state.showMediaLibrary = false
        break
      case 'media':
        state.showMediaLibrary = true
        state.showObjectLibrary = false
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
