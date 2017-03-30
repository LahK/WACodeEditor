import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import EditorWindow from './modules/EditorWindow'
import UtilityArea from './modules/UtilityArea'
import Events from './modules/Events'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  modules: {
    ew: EditorWindow,
    UtilityArea,
    Events
  },
  strict: debug,
  plugins: []
})
