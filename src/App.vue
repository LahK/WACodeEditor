<template>
  <div id="app"
  >
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
import { SET_MULTI_SELECTION_MODE } from './store/mutation-types'
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
      showUtilityArea: state => state.ew.showUtilityArea,
      selectedObject: state => state.Events.selectedObject,
      selectedObjects: state => state.Events.selectedObjects,
      mouseDownPosition: state => state.Events.mouseDownPosition,
      selectedObjectsLastPosList: state => state.Events.selectedObjectsLastPosList,
      selectedObjectVue: state => state.Events.selectedObjectVue
    }),
    isMac () {
      return navigator.userAgent.indexOf('Mac OS X') !== -1
    },
    selectedObjectEle () {
      return document.getElementById(`al-object-${this.selectedObject}`)
    }
  },
  mounted () {
    let _this = this
    document.onkeydown = function (e) {
      console.log('App On Key Down')
      console.log(e.key)

      switch (e.key) {
        // 左
        case 'ArrowLeft':
          e.preventDefault()
          if (_this.canMoveSelectedObject()) { _this.move('left') }
          break
          // 上
        case 'ArrowUp':
          e.preventDefault()
          if (_this.canMoveSelectedObject()) { _this.move('up') }
          break
          // 右
        case 'ArrowRight':
          e.preventDefault()
          if (_this.canMoveSelectedObject()) { _this.move('right') }
          break
          // 下
        case 'ArrowDown':
          e.preventDefault()
          if (_this.canMoveSelectedObject()) { _this.move('down') }
          break
        case 'Enter':
          // 当在编辑组件名称时，不允许换行。（只有单选模式可以编辑）
          if (_this.selectedObject != null) {
            if (_this.isEditingObjectName) {
              e.preventDefault()
            }
          }
          break
        case 'Control':
          if (!_this.isMac) {
            e.preventDefault()
            // 进入多选模式
            _this.$store.commit(SET_MULTI_SELECTION_MODE, true)
          }
          break
        case 'Meta':
          if (_this.isMac) {
            e.preventDefault()
            // 进入多选模式
            _this.$store.commit(SET_MULTI_SELECTION_MODE, true)
          }
          break
        case 'Backspace':
          e.preventDefault()
          break
      }
    }

    document.onkeyup = function (e) {
      e.preventDefault()
      _this.$store.commit(SET_MULTI_SELECTION_MODE, false)
    }

    document.ondrag = function (e) {
      let ele = e.target
      if (ele.className.indexOf('children') !== -1) {
        ele = ele.parentNode
      }
      if (ele.className.indexOf('al-object') !== -1) {
        // console.log(_this.selectedObject)
        if (_this.selectedObject !== null) {
          return
        } else {
          console.log('Ondrag on document')
          console.log('Dragging multiple objects.')
          for (let i = 0; i < _this.selectedObjects.length; i++) {
            let obj = document.getElementById(`al-object-${_this.selectedObjects[i]}`)
            // console.log('moving')
            // console.log(obj)
            let pos = _this.selectedObjectsLastPosList[i]
            let newX = pos.x + (e.pageX - _this.mouseDownPosition.x)
            let newY = pos.y + (e.pageY - _this.mouseDownPosition.y)
            obj.style.left = newX + 'px'
            obj.style.top = newY + 'px'
          }
        }
      }
    }
  },
  methods: {
    onKeyDown (e) {
    },
    move (direction) {
      let pos = this.getObjectPosition(this.selectedObjectEle)
      let newValue = ''
      let styleName = ''
      switch (direction) {
        case 'left':
          newValue = (pos.x - 1) + 'px'
          styleName = 'left'
          break
        case 'right':
          newValue = (pos.x + 1) + 'px'
          styleName = 'left'
          break
        case 'up':
          newValue = (pos.y - 1) + 'px'
          styleName = 'top'
          break
        case 'down':
          newValue = (pos.y + 1) + 'px'
          styleName = 'top'
          break
      }
      console.log(pos)
      console.log(newValue)
      this.updateSelectedObjectStyle(styleName, newValue)
    },
    getObjectPosition (obj) {
      return {
        x: parseFloat(window.getComputedStyle(obj).left),
        y: parseFloat(window.getComputedStyle(obj).top)
      }
    },
    updateSelectedObjectStyle (attrName, newValue) {
      // 更新 style
      this.selectedObjectEle.style[attrName] = newValue
      // 更新 Attributes Inspector
      document.getElementsByName(attrName)[0].value = newValue
    },
    // 判断是否能够移动选中组件
    canMoveSelectedObject () {
      // 1. 当不是在编辑组件名称，并且没有 focus 的时候
      // 2. 当处于 focus 状态，并且 focus 的输入框为 Left 或者 Top
      return this.selectedObject !== null && ((!this.isFocus && !this.isEditingObjectName) || (this.isFocus && (this.focusInputName === 'Left' || this.focusInputName === 'Top')))
    }
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
