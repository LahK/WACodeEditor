<template>
  <div class="toolbar">
    <div class="btn-group editor-setting">
      <toolbar-button isFirst="true" btnImg="./static/img/standard-editor" btnImgFormat="svg"></toolbar-button>
      <toolbar-button isLast="true" btnImg="./static/img/assistant-editor" btnImgFormat="svg"></toolbar-button>
    </div>
    <div class="btn-group pane-setting">
      <toolbar-button 
        isFirst="true" 
        :bindActive="showNavigatorArea" 
        btnImg="./static/img/left-pane" 
        btnImgFormat="svg" 
        @click="toggleArea('nav')"
      />
      <toolbar-button 
        btnImg="./static/img/bottom-pane" 
        btnImgFormat="svg"
      />
      <toolbar-button 
        isLast="true" 
        :bindActive="showUtilityArea" 
        btnImg="./static/img/right-pane" 
        btnImgFormat="svg" 
        @click="toggleArea('util')"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as types from '../../../store/mutation-types'
import ToolbarButton from './ToolbarButton'
export default {
  name: 'toolbar',
  components: {
    ToolbarButton
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      showNavigatorArea: state => state.ew.showNavigatorArea,
      showUtilityArea: state => state.ew.showUtilityArea
    })
  },
  methods: {
    toggleArea (which) {
      this.$store.commit(types.TOGGLE_AREA_DISPLAY, {
        which
      })
    }
  }
}
</script>

<style scoped>
.toolbar {
  height: 38px;
  width: 100%;

  box-shadow: 0 0 2px rgba(0,0,0,0.25);

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.btn-group {
  display: flex;
  flex-direction: row;
  height: 70%;
  width: auto;
  margin-right: 10px;
}
.toolbar-button {
  display: flex;
  align-items: center;
  padding: 3px 6px;
  width: 18px;
  height: 14px;
  border: solid #eeeeee;
  border-width: 1px 1px 1px 0px;
}
.toolbar-button.onlyone {
  border-radius: 5px;
  border-width: 1px;
}
.toolbar-button.first {
  border-radius: 5px 0 0 5px;
  border-width: 1px 1px 1px 1px;
}
.toolbar-button.last {
  border-radius: 0 5px 5px 0;
  border-width: 1px 1px 1px 0;
}
.pane-setting {
  order: 9;
}
.editor-setting {
  order: 8;
}
</style>
