<template>
  <div class="inspector-data-cell">
    <span class="name">{{ displayName }}</span>
    <input type="text" :name="dataName" :value="selectedObjectEle.getAttribute(dataName)"
      @change="onChange($event)"
      @focus="onFocus($event)"
      @blur="onBlur()"
    >
  </div>
</template>

<script>
import { SET_IS_FOCUS } from '../../../store/mutation-types'
export default {
  name: 'inspector-data-cell',
  props: ['displayName', 'dataName', 'selectedObject'],
  data () {
    return {
    }
  },
  computed: {
    selectedObjectEle () {
      return document.getElementById(`al-object-${this.selectedObject}`)
    }
  },
  methods: {
    onChange (e) {
      this.selectedObjectEle.setAttribute(this.dataName, e.target.value)
      if (this.dataName === 'al-text') {
        this.selectedObjectEle.childNodes[0].nodeValue = e.target.value
      }
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
        inputName: this.dataName
      })
    }
  }
}
</script>

<style scoped>
.inspector-data-cell {
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
