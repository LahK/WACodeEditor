<template>
  <div class="document-outline-cell"
    :style="{ 'padding-left': level != 0 ? '15px' : '0' }"
  >
    <div class="parent-cell"
     :class="{ selected: isSelected }"
     @mousedown="onMouseDown($event)"
    >
      <div class="more" :style="{ 'background-image': hasChildren ? (folded ? 'url(../../../../static/img/more.png)' : 'url(../../../../static/img/less.png)') : ''}"></div>
      <div class="icon" :style="{ 'background-image': 'url(../../../../static/img/o-'+type+'.png)'}"></div>
      <div class="name">{{ name }}</div>
    </div>
    <template v-if="hasChildren">
    <div v-show="!folded">
      <document-outline-cell 
        v-for="(child, index) in children"
        :cellData="child"
        :key="index"
      />
    </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MOUSE_DOWN_ON_DOC_OUTLINE_CELL } from '../../../store/mutation-types'
export default {
  name: 'document-outline-cell',
  components: {
    'document-outline-cell': this
  },
  props: ['cellData'],
  data () {
    return {
      active: false,
      folded: false
    }
  },
  computed: {
    ...mapState({
      selectedObject: state => state.Events.selectedObject,
      selectedObjects: state => state.Events.selectedObjects
    }),
    type () {
      return this.cellData.type
    },
    id () {
      return this.cellData.id
    },
    name () {
      return this.cellData.name
    },
    level () {
      return this.cellData.level
    },
    children () {
      return this.cellData.children === undefined ? [] : this.cellData.children
    },
    hasChildren () {
      return this.children.length
    },
    isSelected () {
      if (this.selectedObject === `${this.id}`) {
        console.log('Is Selected')
        return true
      } else if (this.selectedObjects.indexOf(`${this.id}`) !== -1) {
        console.log('Is One of Selected Objects')
        return true
      } else {
        console.log('Is Not Selected')
        return false
      }
    }
  },
  methods: {
    onMouseDown (e) {
      let cell = e.target.className.indexOf('parent-cell') === -1 ? e.target.parentNode : e.target
      if (cell.parentNode !== this.$el) { return }
      console.log('MouseDown Event on Document Outline Cell: ' + this.id)

      this.$store.commit(MOUSE_DOWN_ON_DOC_OUTLINE_CELL, this.id)
    }
  }
}
</script>

<style scoped>
.document-outline-cell {
  font-size: 12px;
  font-weight: 500;

  cursor: pointer;
}
.parent-cell {
  display: flex;
  flex-direction: row;
  padding: 2px 0;
}
.more {
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
}
.icon {
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
}
.name {
  width: calc(100% -36px);
  height: 15px;

  padding-left: 5px;

  display: flex;
  align-items: center;
}
.selected {
  background-color: #0069d9;
}
</style>
