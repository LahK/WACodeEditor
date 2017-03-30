<template>
  <div class="al-page"
    :class="{ active: isActive}"
    @mousedown="mouseDown($event)"
    @drag="onDrag($event)"
    @dragenter="onDragEnter($event)"
    @dragleave="onDragLeave($event)"
    @dragover.prevent
    @drop="onDrop($event)"
    draggable
  >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MOUSE_DOWN } from '../../store/mutation-types'
export default {
  name: 'al-page',
  props: [],
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapState({
      mouseDownPosition: state => state.Events.mouseDownPosition,
      mouseDownObjectStatus: state => state.Events.mouseDownObjectStatus
    })
  },
  methods: {
    mouseDown (e) {
      this.$store.commit(MOUSE_DOWN, {
        e
      })
    },
    onDrag (e) {
      if (e.pageX === 0 && e.pageY === 0) { return } // 消除松开鼠标时的坐标误差
      let ele = e.target
      let { x, y } = this.mouseDownObjectStatus
      ele.style.left = x + (parseFloat(e.pageX) - this.mouseDownPosition.x) + 'px'
      ele.style.top = y + (parseFloat(e.pageY) - this.mouseDownPosition.y) + 'px'
    },
    onDragEnter (e) {
      this.isActive = true
      console.log('enter')
      // this.$store.commit(SET_DRAG_OVER_PAGE, {
      //   ele: e.target
      // })
    },
    onDragLeave (e) {
      this.isActive = false
      console.log('leave')
      // this.$store.commit(SET_DRAG_OVER_PAGE, {
      //   ele: null
      // })
    },
    onDrop (e) {
      this.isActive = false
      let ele = e.target
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
.al-page {
  width: 375px;
  height: 667px;

  background-color: white;

  border: 1px solid #bcbcbc;

  overflow: hidden;
}
.al-page.active {
  border-color: #42b983;
}
</style>

