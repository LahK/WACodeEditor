<template>
  <div class="editor-area">
    <div class="storyboard-editor">
      <div class="documtent-outline" v-show="showDocumentOutline">
        
      </div>
      <div class="editor" :style="{ width: showDocumentOutline ? 'calc(100% - 259px)' : '100%' }">
        <div class="storyboard">
          <al-page />
          <al-page />
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
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabbarButton from '../../common/TabbarButton'
import AlPage from '../../objects/ALPage'
export default {
  name: 'editor-area',
  components: {
    TabbarButton, AlPage
  },
  mounted () {
  },
  data () {
    return {
      showDocumentOutline: true
    }
  },
  methods: {
    toggleDocumentOutline () {
      this.showDocumentOutline = !this.showDocumentOutline
    }
  }
}
</script>

<style scoped>
.editor-area {
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
