<template>
  <div class="al-object">
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
import AlViewChildren from './AlViewChildren'
export default {
  name: 'al-object',
  components: {
    AlView, AlImage, AlButton, AlLabel, 
    Child: this
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
