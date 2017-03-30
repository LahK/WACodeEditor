<template>
  <div id="app">
    <toolbar></toolbar>
    <div class="areas">
      <navigator-area v-show="showNavigatorArea"></navigator-area>
      <editor-area id="editor-area" :style="{ width : `calc(100vw - ${showNavigatorArea ? '259px' : '0px'} - ${showUtilityArea ? '259px' : '0px'})`}"></editor-area>
      <utility-area v-show="showUtilityArea"></utility-area>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Toolbar from './components/EditorFrame/Toolbar/Toolbar'
import NavigatorArea from './components/EditorFrame/NavigatorArea/NavigatorArea'
import EditorArea from './components/EditorFrame/EditorArea/EditorArea'
import UtilityArea from './components/EditorFrame/UtilityArea/UtilityArea'

export default {
  name: 'app',
  components: {
    Toolbar,
    NavigatorArea,
    EditorArea,
    UtilityArea
  },
  computed: {
    ...mapState({
      showNavigatorArea: state => state.ew.showNavigatorArea,
      showUtilityArea: state => state.ew.showUtilityArea
    })
  },
  methods: {
  }
}
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: column;

  min-width: 960px;
  min-height: 390px;
}
.areas {
  display: flex;
  flex-direction: row;
}
</style>
