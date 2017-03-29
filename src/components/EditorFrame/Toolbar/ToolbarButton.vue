<template>
  <div class="toolbar-button" :class="{ active: active, first: isFirst, last: isLast, onlyone: isOnlyOne }">
    <img :src="btnImg+(active ? '-active.' :'.')+btnImgFormat" @click="btnOnClick">
  </div>
</template>

<script>
export default {
  name: 'toolbar-button',
  props: ['btnImg', 'btnImgFormat', 'isActive', 'isFirst', 'isLast', 'isOnlyOne'],
  mounted () {
    this.active = this.isActive
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    btnOnClick () {
      this.active = !this.active
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
