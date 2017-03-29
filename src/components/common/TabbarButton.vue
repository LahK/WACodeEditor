<template>
  <div class="tabbar-button">
    <img :src="btnImg+(active ? '-active.' :'.')+btnImgFormat" @click="btnOnClick">
  </div>
</template>

<script>
export default {
  name: 'tabbar-button',
  props: ['btnImg', 'btnImgFormat', 'isActive', 'onClick'],
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
      this.$emit('click', this.active)
    }
  }
}
</script>

<style scoped>
div {
  padding: 5px;
}
div, img {
  width: 14px;
  height: 14px;
}
</style>
