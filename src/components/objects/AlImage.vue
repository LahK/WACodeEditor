<template>
  <div class="al-object al-image"
    :class="{ active: isActive, selected: isSelected }"
    :al-level="level"
    @mousedown="mouseDown($event)"
    @drag="onDrag($event)"
    @dragstart="onDragStart($event)"
    @dragend="onDragEnd($event)"
    @dragenter="onDragEnter($event)"
    @dragleave="onDragLeave($event)"
    @dragover.prevent
    @drop="onDrop($event)"
    draggable
    :al-mode="mode"
  >
  </div>
</template>

<script>
// 'Scale to Fill' / 'Aspect Fit' / 'Aspect Fill'

import { mapState } from 'vuex'
import { MOUSE_DOWN_ON_OBJECT, SET_IS_STORYBOARD_DOM_CHANGED } from '../../store/mutation-types'
export default {
  name: 'al-image',
  props: ['level'],
  data () {
    return {
      isActive: false,
      mode: 'Scale to Fill'
    }
  },
  watch: {
    mode (newValue) {
      switch (newValue) {
        case 'Scale to Fill':
          this.$el.style.backgroundSize = '100% 100%'
          break
        case 'Aspect Fit':
          this.$el.style.backgroundSize = 'contain'
          break
        case 'Aspect Fill':
          this.$el.style.backgroundSize = 'cover'
          break
      }
    }
  },
  computed: {
    ...mapState({
      mouseDownPosition: state => state.Events.mouseDownPosition,
      mouseUpPosition: state => state.Events.mouseUpPosition,
      mouseDownObjectStatus: state => state.Events.mouseDownObjectStatus,
      selectedObject: state => state.Events.selectedObject,
      selectedObjects: state => state.Events.selectedObjects
    }),
    isSelected () {
      if (this.selectedObject === `${this._uid}`) {
        console.log('Is Selected')
        return true
      } else if (this.selectedObjects.indexOf(`${this._uid}`) !== -1) {
        console.log('Is One of Selected Objects')
        return true
      } else {
        console.log('Is Not Selected')
        return false
      }
    }
  },
  mounted () {
    console.log(this)
    this.$el.setAttribute('al-id', this._uid)
    this.$el.id = 'al-object-' + this._uid
    this.$el.setAttribute('al-type', 'al-image')
    this.$el.setAttribute('al-name', `Image ${this._uid}`)

    // 让元素降落在鼠标落点
    this.$el.style.left = this.mouseUpPosition.x + 'px'
    this.$el.style.top = this.mouseUpPosition.y + 'px'
    // 通知 storyboard 增加了新元素
    this.$store.commit(SET_IS_STORYBOARD_DOM_CHANGED, true)
  },
  methods: {
    mouseDown (e) {
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('MouseDown Event on Al-View')

      this.$store.commit(MOUSE_DOWN_ON_OBJECT, e)
    },
    onDrag (e) {
      if (e.pageX === 0 && e.pageY <= 2) { return } // 消除松开鼠标时的坐标误差 (0,0), (0,2)
      let ele = e.target
      if (ele !== this.$el) { return }
      if (this.selectedObject === null) { return }
      console.log('Drag Event on Al-View')

      let { x, y } = this.mouseDownObjectStatus
      ele.style.left = x + (parseFloat(e.pageX) - this.mouseDownPosition.x) + 'px'
      ele.style.top = y + (parseFloat(e.pageY) - this.mouseDownPosition.y) + 'px'
    },
    onDragStart (e) {
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('DragStart Event on Al-View')

      e.dataTransfer.effectAllowed = 'move'
      this.isActive = true
    },
    onDragEnd (e) {
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('DragEnd Event on Al-View')

      e.dataTransfer.dropEffect = 'move'
      this.isActive = false
    },
    onDragEnter (e) {
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('DragEnter Event on Al-View')

      this.isActive = true
      console.log('enter')
    },
    onDragLeave (e) {
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('DragLeave Event on Al-View')

      this.isActive = false
      console.log('leave')
    },
    onDrop (e) {
      this.isActive = false
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('Drop Event on Al-View')

      let type = e.dataTransfer.getData('text/plain')
      switch (type) {
        case 'View':
          ele.innerHTML += 'NewObject'
          break
        case 'Image':
          ele.innerHTML += 'NewObject'
          break
        case 'Button':
          ele.innerHTML += 'NewObject'
          break
        case 'Label':
          ele.innerHTML += 'NewObject'
          break
        case 'existing':
          break
      }
    }
  }
}
</script>

<style scoped>
.al-image {
  position: absolute;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */

  width: 240px;
  height: 128px;

  background-color: #eeeeee;
  background-image: url(../../../static/img/logo.png);
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
}
.active {
  border: 1px solid;
  border-color: #42b983;
}
.selected {
  border: 1px solid;
  border-color: #42b983;
}
</style>
