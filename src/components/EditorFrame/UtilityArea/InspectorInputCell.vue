<template>
  <div class="inspector-input-cell">
    <span class="name">{{ displayName }}</span>
    <input type="text" :name="styleName" :value="computedStyle[styleName]"
      @change="onChange($event)"
      @focus="onFocus($event)"
      @blur="onBlur()"
    >
  </div>
</template>

<script>
import { SET_IS_FOCUS } from '../../../store/mutation-types'
export default {
  name: 'inspector-input-cell',
  props: ['displayName', 'styleName', 'selectedObject'],
  data () {
    return {
    }
  },
  computed: {
    computedStyle () {
      return window.getComputedStyle(document.getElementById(`al-object-${this.selectedObject}`))
    }
  },
  methods: {
    onChange (e) {
      document.getElementById(`al-object-${this.selectedObject}`).style[this.styleName] = e.target.value
    },
    // 当退出文字输入状态时
    // 重置 isFocus 为 false，保证 “删除” 事件正常响应
    onBlur () {
      this.$store.commit(SET_IS_FOCUS, {
        isFocus: false,
        inputName: ''
      })
    },
    // 当进入文字输入状态时
    // 设置 isFocus 为 true, “删除” 事件正常响应
    onFocus (event) {
      this.$store.commit(SET_IS_FOCUS, {
        isFocus: true,
        inputName: this.styleName
      })
    }
  }
}
</script>

<style scoped>
.inspector-input-cell {
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0 5px;
}
span {
  flex: 3;

  text-align: right;

  font-size: 10px;
  font-weight: 500;
}
input {
  flex: 7;
  font-size: 11px;
  font-weight: 500;
}
</style>
