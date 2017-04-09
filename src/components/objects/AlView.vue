<template>
  <div class="al-object al-view"
    :class="{ active: isActive, selected: isSelected }"
    :al-level="level"
  >
    <div class="children"
      @mousedown="mouseDown($event)"
      @drag="onDrag($event)"
      @dragstart="onDragStart($event)"
      @dragend="onDragEnd($event)"
      @dragenter="onDragEnter($event)"
      @dragleave="onDragLeave($event)"
      @dragover.prevent
      @drop="onDrop($event)"
      draggable
    >
      <template
        v-for="(item, index) in objects"
      >
        <al-view v-if="item === 'AlView'" 
          :key="index"
          :level="parseInt(level)+1"
        />
        <component
          v-if="item !== 'AlView'"
          :is="item"
          :key="index"
          :level="parseInt(level)+1"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MOUSE_DOWN_ON_OBJECT, MOUSE_UP_ON_LIB_CELL, SET_IS_STORYBOARD_DOM_CHANGED } from '../../store/mutation-types'
import AlImage from './AlImage'
import AlButton from './AlButton'
import AlLabel from './AlLabel'
export default {
  name: 'al-view',
  props: ['level'],
  data () {
    return {
      isActive: false,
      objects: []
    }
  },
  components: {
    AlImage,
    AlButton,
    AlLabel,
    'al-view': this
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
    },
    children () {
      return this.$el.getElementsByClassName('children')[0]
    }
  },
  mounted () {
    console.log(this)
    this.$el.setAttribute('al-id', this._uid)
    this.$el.id = 'al-object-' + this._uid
    this.$el.setAttribute('al-type', 'al-view')
    this.$el.setAttribute('al-name', `View ${this._uid}`)

    // 让元素降落在鼠标落点
    this.$el.style.left = this.mouseUpPosition.x + 'px'
    this.$el.style.top = this.mouseUpPosition.y + 'px'
    // 通知 storyboard 增加了新元素
    this.$store.commit(SET_IS_STORYBOARD_DOM_CHANGED, true)

    window.addEventListener('keyup', this.onDelete)
  },
  methods: {
    mouseDown (e) {
      let ele = e.target
      if (ele !== this.$el && ele !== this.children) { return }
      console.log('MouseDown Event on Al-View')
      console.log(e)
      this.$store.commit(MOUSE_DOWN_ON_OBJECT, e)
    },
    onDelete (e) {
      console.log('key up')
      console.log(e)
      console.log(this.selectedObject)
      console.log(this._uid)
      console.log(this.selectedObject === this._uid)
      if (this.selectedObject === this._uid + '') {
        this.$emit('onDelete')
      }
    },
    onDrag (e) {
      if (e.pageX === 0 && e.pageY <= 2) { return } // 消除松开鼠标时的坐标误差 (0,0), (0,2)
      let ele = e.target
      if (ele !== this.$el && ele !== this.children) { return }
      if (this.selectedObject === null) { return }
      console.log('Drag Event on Al-View')

      // console.log(this.mouseDownObjectStatus)
      // console.log(e.pageX)
      // console.log(e.pageY)

      let { x, y } = this.mouseDownObjectStatus
      // console.log(x + (parseFloat(e.pageX) - this.mouseDownPosition.x) + 'px')
      // console.log(y + (parseFloat(e.pageY) - this.mouseDownPosition.y) + 'px')
      this.$el.style.left = x + (parseFloat(e.pageX) - this.mouseDownPosition.x) + 'px'
      this.$el.style.top = y + (parseFloat(e.pageY) - this.mouseDownPosition.y) + 'px'
    },
    onDragStart (e) {
      let ele = e.target
      if (ele !== this.$el && ele !== this.children) { return }
      console.log('DragStart Event on Al-View')

      this.$store.commit(MOUSE_DOWN_ON_OBJECT, e)
      e.dataTransfer.effectAllowed = 'move'
      this.isActive = true
    },
    onDragEnd (e) {
      let ele = e.target
      if (ele !== this.$el && ele !== this.children) { return }
      console.log('DragEnd Event on Al-View')

      e.dataTransfer.dropEffect = 'move'
      this.isActive = false
    },
    onDragEnter (e) {
      let ele = e.target
      if (ele !== this.$el && ele !== this.children) { return }
      console.log('DragEnter Event on Al-View')

      this.isActive = true
      console.log('enter')
    },
    onDragLeave (e) {
      let ele = e.target
      if (ele !== this.$el && ele !== this.children) { return }
      console.log('DragLeave Event on Al-View')

      this.isActive = false
      console.log('leave')
    },
    onDrop (e) {
      this.isActive = false
      let ele = e.target
      console.log(ele)
      console.log(this.$el.getElementsByClassName('children')[0])
      if (ele !== this.$el && ele !== this.children) { return }
      console.log('Drop Event on Al-View')

      let type = e.dataTransfer.getData('text/plain')
      this.$store.commit(MOUSE_UP_ON_LIB_CELL, e)
      this.objects.push(type)
    }
  }
}
</script>

<style scoped>
.al-view {
  position: absolute;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */

  width: 240px;
  height: 128px;

  background-color: red;

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
.children {
  width: 100%;
  height: 100%;

  overflow: hidden;
  position: relative;
}
</style>
