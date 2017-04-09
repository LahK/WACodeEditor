<template>
  <div class="editor-area">
    <div class="storyboard-editor">
      <div class="documtent-outline" v-show="showDocumentOutline">
        <document-outline-cell 
          v-for="(item, index) in docOutline"
          :cellData="item"
          :key="index"
        />
      </div>
      <div class="editor" 
        :style="{ width: showDocumentOutline ? 'calc(100% - 259px)' : '100%' }"
      >
        <div class="storyboard"
        >
          <al-page />
        </div>
        <div class="utilities">
          <tabbar-button 
            btnImg="../../../../static/img/left-pane"
            btnImgFormat="svg"
            isActive="true"
            @click="toggleDocumentOutline"
          />
          <tabbar-button 
            btnImg="../../../../static/img/align"
            btnImgFormat="svg"
          />
          <tabbar-button 
            btnImg="../../../../static/img/add-constraint"
            btnImgFormat="svg"
          />
          <tabbar-button 
            btnImg="../../../../static/img/auto-layout"
            btnImgFormat="svg"
            :bindActive="showSizeConstraintEditor"
            @click="toggleSizeConstraintEditor"
          />
        </div>
        <size-constraint-editor 
          v-if="showSizeConstraintEditor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { SET_IS_STORYBOARD_DOM_CHANGED, SET_SIZE_CONSTRAINT_EDITOR } from '../../../store/mutation-types'
import TabbarButton from '../../common/TabbarButton'
import SizeConstraintEditor from './SizeConstraintEditor'
import AlPage from '../../objects/AlPage'
import DocumentOutlineCell from './DocumentOutlineCell'
export default {
  name: 'editor-area',
  components: {
    TabbarButton, AlPage, DocumentOutlineCell, SizeConstraintEditor
  },
  mounted () {
  },
  data () {
    return {
      showDocumentOutline: true,
      lastStoryboardDOM: null,
      docOutline: []
    }
  },
  computed: {
    ...mapState({
      isStoryboardDOMChanged: state => state.ew.isStoryboardDOMChanged,
      selectedObject: state => state.Events.selectedObject,
      showSizeConstraintEditor: state => state.ew.showSizeConstraintEditor
    }),
    selectedObjectEle () {
      return document.getElementById(`al-object-${this.selectedObject}`)
    },
    shouldShowSizeConstraintEditor () {
      return this.selectedObject !== null && this.shouldShowSizeConstraintEditor
    }
  },
  watch: {
    selectedObject (newValue) {
      if (newValue === null) {
        this.$store.commit(SET_SIZE_CONSTRAINT_EDITOR, false)
      }
    },
    isStoryboardDOMChanged (newValue) {
      if (newValue === true) {
        let pages = document.getElementsByClassName('al-page')
        let list = []
        for (let i = 0; i < pages.length; i++) {
          let page = pages[i]
          let pageData = {
            type: 'al-page',
            id: page.getAttribute('al-id'),
            name: page.getAttribute('al-name'),
            level: 0,
            children: []
          }
          let objs = page.children
          for (let j = 0; j < objs.length; j++) {
            let obj = objs[j]
            if (obj.className.indexOf('al-view') !== -1) {
              pageData.children.push(this.getElementOutline(obj, 1))
            } else {
              pageData.children.push({
                type: obj.getAttribute('al-type'),
                id: obj.getAttribute('al-id'),
                name: obj.getAttribute('al-name'),
                level: 1
              })
            }
          }

          list.push(pageData)
        }
        this.lastStoryboardDOM = document.getElementsByClassName('storyboard')[0]
        this.docOutline = list

        this.$store.commit(SET_IS_STORYBOARD_DOM_CHANGED, false)
      }
    }
  },
  methods: {
    toggleDocumentOutline () {
      this.showDocumentOutline = !this.showDocumentOutline
    },
    toggleSizeConstraintEditor () {
      if (this.selectedObject !== null && this.showSizeConstraintEditor === false) {
        this.$store.commit(SET_SIZE_CONSTRAINT_EDITOR, true)
      } else if (this.showSizeConstraintEditor === true) {
        this.$store.commit(SET_SIZE_CONSTRAINT_EDITOR, false)
      }
    },
    getElementOutline (ele, level) {
      let eleData = {
        type: 'al-view',
        id: ele.getAttribute('al-id'),
        name: ele.getAttribute('al-name'),
        level: level,
        children: []
      }
      let children = ele.getElementsByClassName('children')[0].children
      for (let i = 0; i < children.length; i++) {
        let child = children[i]
        if (child.className.indexOf('al-view') !== -1) {
          eleData.children.push(this.getElementOutline(child, level + 1))
        } else {
          eleData.children.push({
            type: child.getAttribute('al-type'),
            id: child.getAttribute('al-id'),
            name: child.getAttribute('al-name'),
            level: level + 1
          })
        }
      }
      return eleData
    }
  }
}
</script>

<style scoped>
.editor-area {
  z-index: 99;
  width: calc(100vw - 518px);
  min-width: 440px;
  height: calc(100vh - 38px);
}
.storyboard-editor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.documtent-outline {
  width: 259px;
  height: 100%;

  border: solid #b2b2b2;
  border-width: 0 1px 0 0;
}
.editor {
  width: calc(100% - 259px);
  height: 100%;
  display: flex;
  flex-direction: column;
}
.storyboard {
  width: 100%;
  height: calc(100% - 29px);

  position: relative;
  overflow: scroll;
}
.storyboard .al-page {
  position: absolute;
}
.utilities {
  background-color: rgba(240, 240, 240, 1);
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 29px;
}
</style>
