import { MOUSE_DOWN, SET_DRAG_OVER_PAGE } from '../mutation-types'

// initial state
const state = {
  mouseDownPosition: {x: 0, y: 0},
  mouseDownObjectStatus: {x: 0, y: 0, w: 0, h: 0},

  dragOverPage: null
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  [MOUSE_DOWN] (state, { e }) {
    state.mouseDownPosition = {
      x: parseFloat(e.pageX),
      y: parseFloat(e.pageY)
    }
    let eleStyle = window.getComputedStyle(e.target)
    state.mouseDownObjectStatus = {
      x: parseFloat(eleStyle.left),
      y: parseFloat(eleStyle.top),
      w: parseFloat(eleStyle.width),
      h: parseFloat(eleStyle.height)
    }
  },
  [SET_DRAG_OVER_PAGE] (state, { ele }) {
    // ele 是一个 Al-Page Dom 元素
    // 当 ele = null 时，即重置 state.dragOverPage
    state.dragOverPage = ele
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
