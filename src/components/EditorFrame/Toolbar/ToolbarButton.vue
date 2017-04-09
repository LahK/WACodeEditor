<template>
  <div class="toolbar-button" :class="{ active: active, first: isFirst, last: isLast, onlyone: isOnlyOne }">
    <img :src="btnImg+(active ? '-active.' :'.')+btnImgFormat" @click="btnOnClick">
  </div>
</template>

<script>
export default {
  name: 'toolbar-button',
  props: ['btnImg', 'btnImgFormat', 'isActive', 'bindActive', 'isFirst', 'isLast', 'isOnlyOne'],
  mounted () {
    this.active = this.isActive
  },
  beforeUpdate () {
    if (this.bindActive !== undefined) {
      this.active = this.bindActive
    }
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    btnOnClick () {
      if (this.bindActive === undefined) {
        this.active = !this.active
      }
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
