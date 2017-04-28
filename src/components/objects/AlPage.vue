<template>
  <div class="al-page"
    :class="{ active: isActive}"
    al-level="0"
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
    <component
      v-for="(item, index) in objects"
      :is="item"
      :key="objectsKey[index]"
      level="1"
      @onDelete="onDelete(index)"
    ></component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  MOUSE_DOWN_ON_PAGE,
  MOUSE_UP_ON_LIB_CELL,
  SET_IS_STORYBOARD_DOM_CHANGED,
  SET_SELECTED_OBJECT
} from '../../store/mutation-types'
import AlView from '../objects/AlView'
import AlImage from '../objects/AlImage'
import AlButton from '../objects/AlButton'
import AlLabel from '../objects/AlLabel'
export default {
  name: 'al-page',
  props: [],
  components: {
    AlView, AlImage, AlButton, AlLabel
  },
  mounted () {
    console.log(this)
    this.$el.setAttribute('al-id', this._uid)
    this.$el.id = 'al-object-' + this._uid
    this.$el.setAttribute('al-type', 'al-page')
    this.$el.setAttribute('al-name', `Page ${this._uid}`)

    // 通知 storyboard 更新了
    this.$store.commit(SET_IS_STORYBOARD_DOM_CHANGED, true)
  },
  updated () {
    console.log('Al-Page Updated SET_IS_STORYBOARD_DOM_CHANGED')
    // 通知 storyboard 更新了
    this.$store.commit(SET_IS_STORYBOARD_DOM_CHANGED, true)
  },
  data () {
    return {
      isActive: false,
      objects: [],
      objectsKey: [],
      objId: 0,
      objectsInitialStyle: {}
    }
  },
  computed: {
    ...mapState({
      mouseDownPosition: state => state.Events.mouseDownPosition,
      mouseDownObjectStatus: state => state.Events.mouseDownObjectStatus,
      onDragEvent: state => state.Events.onDragEvent
    })
  },
  methods: {
    mouseDown (e) {
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('MouseDown Event on Al-Page')

      this.$store.commit(MOUSE_DOWN_ON_PAGE, {
        e
      })
    },
    onDelete (idx) {
      console.log(`delete ${idx}`)
      this.$store.commit(SET_SELECTED_OBJECT, {
        obj: null
      })
      this.objectsKey.splice(idx, 1)
      this.objects.splice(idx, 1)
    },
    onDrag (e) {
      e.preventDefault()
      if (e.pageX === 0 && e.pageY === 0) { return } // 消除松开鼠标时的坐标误差
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('Drag Event on Al-Page')
      let { x, y } = this.mouseDownObjectStatus
      ele.style.left = x + (parseFloat(e.pageX) - this.mouseDownPosition.x) + 'px'
      ele.style.top = y + (parseFloat(e.pageY) - this.mouseDownPosition.y) + 'px'
    },
    onDragStart (e) {
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('DragStart Event on Al-Page')

      e.dataTransfer.effectAllowed = 'move'
      this.isActive = true
    },
    onDragEnd (e) {
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('DragEnd Event on Al-Page')

      e.dataTransfer.dropEffect = 'move'
      this.isActive = false
    },
    onDragEnter (e) {
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('DragEnter Event on Al-Page')

      // var img = document.createElement('img');
      // img.src = '../../../../static/img/objects/AL-View.png'
      // this.onDragEvent.dataTransfer.setDragImage(document.getElementById('object-pool').lastChild, 0, 0)

      this.isActive = true
      console.log('enter')
    },
    onDragLeave (e) {
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('DragLeave Event on Al-Page')

      this.isActive = false
      console.log('leave')
    },
    onDrop (e) {
      let type = e.dataTransfer.getData('text/plain')
      if (type === null || type === undefined || type === '' || type === 'AlPage') {
        return
      }
      let ele = e.target
      if (ele !== this.$el) { return }
      console.log('Drop Event on Al-Page')

      this.isActive = false
      if (type !== null && type !== undefined && type !== 'AlPage') {
        this.$store.commit(MOUSE_UP_ON_LIB_CELL, e)
        this.objectsKey.push(this._uid + this.objId)
        this.objects.push(type)
        this.objId += 1
      }
    }
  }
}
</script>

<style scoped>
.al-page {
  width: 375px;
  height: 667px;

  background-color: white;

  border: 1px solid #bcbcbc;

  overflow: hidden;
}
.active {
  border-color: #42b983;
}
</style>

