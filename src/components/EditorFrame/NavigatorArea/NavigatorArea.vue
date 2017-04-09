<template>
  <div class="navigator-area">
    <tabbar>
      <tabbar-button btnImg="./static/img/project-navigator" btnImgFormat="svg"/>
      <tabbar-button btnImg="./static/img/find-navigator" btnImgFormat="svg"/>
    </tabbar>
  </div>
</template>

<script>
import Tabbar from '../../common/Tabbar'
import TabbarButton from '../../common/TabbarButton'
export default {
  name: 'navigator-area',
  components: {
    Tabbar, TabbarButton
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.navigator-area {
  z-index: 99;
  width: 259px;
  height: calc(100vh - 38px);

  border: solid #b2b2b2;
  border-width: 0 1px 0 0;

  background: rgba(239,239,239,0.4);
}
</style>
