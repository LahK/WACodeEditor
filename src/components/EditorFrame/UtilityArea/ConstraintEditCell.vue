<template>
  <div class="constraint-edit-cell">
    <span class="name">{{ cellName }}: </span>
    <input type="text" :name="cellName" :value="cellValue"
      v-if="canEdit"
      @change="onChange($event)"
      @focus="onFocus($event)"
      @blur="onBlur()"
    >
    <span class="value" v-if="!canEdit">{{ cellValue }}</span>
  </div>
</template>

<script>
import { SET_IS_FOCUS, UPDATE_SELECTED_CONSTRAINT } from '../../../store/mutation-types'
export default {
  name: 'constraint-edit-cell',
  props: ['cellName', 'cellValue', 'canEdit'],
  data () {
    return {
    }
  },
  methods: {
    onChange (e) {
      this.$store.commit(UPDATE_SELECTED_CONSTRAINT, {
        which: this.cellName,
        value: e.target.value
      })
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
        inputName: this.cellName
      })
    }
  }
}
</script>

<style scoped>
.constraint-edit-cell {
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 2px;
}
span.name {
  flex: 4;

  text-align: right;

  font-size: 12px;
  font-weight: 500;
}
input, span.value {
  text-align: left;
  margin-left: 10px;
  flex: 6;
  font-size: 12px;
  font-weight: 600;
}
input {
  width: 50px;
}
</style>
