<template>
  <div class="inspector-custom-select-cell">
    <span class="name">{{ displayName }}</span>
    <select
    :name="styleName"
    :value="getCustomStyleValue()"
    @change="customStyleValueChange($event)"
    >
      <option
      v-for="(val, k, idx) in customStyleValue"
      :value="k"
      >
        {{ k }}
      </option>
    </select>
  </div>
</template>

<script>
import _ from 'lodash'
import Config from '../../../Config'
export default {
  name: 'inspector-custom-select-cell',
  props: ['displayName', 'styleName', 'selectedObject'],
  data () {
    return {
      inputValue: ''
    }
  },
  computed: {
    selectedObjectEle () {
      return document.getElementById(`al-object-${this.selectedObject}`)
    },
    selectedObjectComputedStyle () {
      return window.getComputedStyle(this.selectedObjectEle)
    },
    customStyleValue () {
      return Config.customStyles[this.styleName]
    }
  },
  methods: {
    onChange (e) {
      this.selectedObjectEle.style[this.styleName] = e.target.value
    },
    getCustomStyleValue () {
      let style = {}
      let customStyleDict = Config.customStyles[this.styleName]
      let customStyleDictKeys = Object.keys(customStyleDict)

      Object.assign(style, customStyleDict[customStyleDictKeys[0]])
      let styleKeys = Object.keys(style)

      for (let i = 0; i < styleKeys.length; i++) {
        style[styleKeys[i]] = this.selectedObjectComputedStyle[styleKeys[i]]
      }

      for (let i = 0; i < customStyleDictKeys.length; i++) {
        let item = customStyleDict[customStyleDictKeys[i]]
        if (_.isEqual(style, item)) {
          return customStyleDictKeys[i]
        }
      }
      return customStyleDictKeys[0]
    },
    customStyleValueChange (event) {
      let customStyleDict = Config.customStyles[this.styleName]
      let style = customStyleDict[event.target.value]
      let keys = Object.keys(style)
      for (let i = 0; i < keys.length; i++) {
        this.selectedObjectEle.style[keys[i]] = style[keys[i]]
      }
    }
  }
}
</script>

<style scoped>
.inspector-custom-select-cell {
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
select {
  flex: 7;
  font-size: 11px;
  font-weight: 500;
}
</style>
