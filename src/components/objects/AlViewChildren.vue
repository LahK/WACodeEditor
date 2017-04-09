<template>
  <div class="al-view-children">
    <component
      v-for="(item, index) in objects"
      :is="item"
      :key="index"
    />
  </div>
</template>

<script>
import AlView from './AlView'
import AlImage from './AlImage'
import AlButton from './AlButton'
import AlLabel from './AlLabel'
export default {
  name: 'al-view-children',
  components: {
    AlView, AlImage, AlButton, AlLabel
  },
  props: ['objects'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  
</style>
