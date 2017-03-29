<template>
  <div class="tabbar">
  <slot>
    Tabs
  </slot>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  props: ['width', 'height'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.tabbar {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 29px;

  border: solid #b2b2b2;
  border-width: 0 0 0.5px 0;
}
</style>
