<template>
  <div class="tabbar-button">
    <img :src="btnImg+(active ? '-active.' :'.')+btnImgFormat" @click="btnOnClick">
  </div>
</template>

<script>
export default {
  name: 'tabbar-button',
  props: ['btnImg', 'btnImgFormat', 'isActive', 'onClick', 'bindActive'],
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
