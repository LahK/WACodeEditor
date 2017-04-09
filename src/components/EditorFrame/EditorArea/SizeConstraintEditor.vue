<template>
  <div class="size-constraint-editor" :class="{ active: active }">
    <div class="title">Add new constraint(s)</div>
    <div class="section-title">Size</div>
    <div class="cell">
      <div class="left">
        <input type="checkbox"
          value="c-width"
          v-model="selection"
        >
        <span>Width</span>
      </div>
      <input class="right" type="text" name="c-width"
          v-model="selectedObjectStatus.width"
      >
    </div>
    <div class="cell">
      <div class="left">
        <input type="checkbox"
          value="c-height"
          v-model="selection"
        >
        <span>Height</span>
      </div>
      <input class="right" type="text" name="c-height"
          v-model="selectedObjectStatus.height"
      >
    </div>
    <div class="cell">
      <input type="checkbox" 
        name="c-equal-width-to-box"
        v-model="selection"
      >
      <span>Equal Width To Screen</span>
    </div>
    <div class="cell">
      <input type="checkbox"
        name="c-equal-height-to-box"
        value="c-equal-height-to-box"
        v-model="selection"
      >
      <span>Equal Height To Screen</span>
    </div>
    <div class="section-separator"></div>
    <div class="section-title">Spacing</div>
    <div class="cell">
      <div class="left">
        <input type="checkbox"
          name="c-leading-space"
          value="c-leading-space"
          v-model="selection"
        >
        <span>Leading Space</span>
      </div>
      <input class="right" type="text" name="c-leading-space"
        v-model="selectedObjectStatus.leading.value"
      >
    </div>
    <div class="spacing-note">to {{ getConstraintToObjectMessage('leading') }}</div>
    <div class="cell">
      <div class="left">
        <input type="checkbox"
          name="c-trailing-space"
          value="c-trailing-space"
          v-model="selection"
        >
        <span>Trailing Space</span>
      </div>
      <input class="right" type="text" name="c-trailing-space"
        v-model="selectedObjectStatus.trailing.value"
      >
    </div>
    <div class="spacing-note">to {{ getConstraintToObjectMessage('trailing') }}</div>
    <div class="cell">
      <div class="left">
        <input type="checkbox"
          name="c-top-space"
          value="c-top-space"
          v-model="selection"
        >
        <span>Top Space</span>
      </div>
      <input class="right" type="text" name="c-top-space"
        v-model="selectedObjectStatus.top.value"
      >
    </div>
    <div class="spacing-note">to {{ getConstraintToObjectMessage('top') }}</div>
    <div class="cell">
      <div class="left">
        <input type="checkbox"
          name="c-bottom-space"
          value="c-bottom-space"
          v-model="selection"
        >
        <span>Bottom Space</span>
      </div>
      <input class="right" type="text" name="c-bottom-space"
        v-model="selectedObjectStatus.bottom.value"
      >
    </div>
    <div class="spacing-note">to {{ getConstraintToObjectMessage('bottom') }}</div>
    <div class="section-separator"></div>
    <div class="section-title">Align</div>
    <div class="cell">
      <input type="checkbox"
        name="c-herizontally-in-box"
        value="c-herizontally-in-box"
        v-model="selection"
      >
      <span>Horizontally in Screen</span>
    </div>
    <div class="cell">
      <input type="checkbox"
        name="c-vertically-in-box"
        value="c-vertically-in-box"
        v-model="selection"
      >
      <span>Vertically in Screen</span>
    </div>
    <div class="button"
      @click="addConstraintBtnOnClick"
    >
      Add Constraint(s)
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ADD_CONSTRAINT, SET_SIZE_CONSTRAINT_EDITOR } from '../../../store/mutation-types'
export default {
  name: 'size-constraint-editor',
  props: [],
  beforeMount () {
    this.updateSelectedObjectStatus()
  },
  mounted () {
    this.active = this.isActive
    this.updateSelectedObjectStatus()
  },
  data () {
    return {
      active: false,
      selectedObjectStatus: {},
      selection: []
    }
  },
  computed: {
    ...mapState({
      selectedObject: state => state.Events.selectedObject
    }),
    selectedObjectEle () {
      return document.getElementById(`al-object-${this.selectedObject}`)
    },
    selectedObjectComputedStyle () {
      return window.getComputedStyle(this.selectedObjectEle)
    },
    selectedObjectContainner () {
      let ele = this.selectedObjectEle.parentNode
      while (ele.className.indexOf('al-view') === -1 && ele.className.indexOf('al-page') === -1) {
        ele = ele.parentNode
      }
      return ele
    },
    objects () {
      return this.getChildrenList(this.selectedObjectContainner)
    }
  },
  watch: {
    selectedObject (newValue) {
      if (newValue === null) {
        this.selectedObjectStatus = {}
        return
      }
      this.updateSelectedObjectStatus()
    }
  },
  methods: {
    getChildrenList (ele) {
      let list = []
      if (ele.className.indexOf('al-page') !== -1) {
        let children = ele.children
        for (let i = 0; i < children.length; i++) {
          if (children[i].className.indexOf('al-view') !== -1) {
            list = [...list, children[i], ...this.getChildrenList(children[i])]
          } else {
            list = [...list, children[i]]
          }
        }
      }
      if (ele.className.indexOf('al-view') !== -1) {
        let children = ele.getElementsByClassName('children')[0].children
        for (let i = 0; i < children.length; i++) {
          if (children[i].className.indexOf('al-view') !== -1) {
            list = [...list, children[i], ...this.getChildrenList(children[i])]
          } else {
            list = [...list, children[i]]
          }
        }
      }
      return list
    },
    statusOf (obj) {
      var objStatus = {
        x: parseFloat(window.getComputedStyle(obj).left) || 0,
        y: parseFloat(window.getComputedStyle(obj).top) || 0,
        w: parseFloat(window.getComputedStyle(obj).width) || 50,
        h: parseFloat(window.getComputedStyle(obj).height) || 50
      }

      return objStatus
    },
    isTopOfAnotherObject (obj, anotherObj) {
      let objStatus = this.statusOf(obj)
      let anotherObjStatus = this.statusOf(anotherObj)
      if (anotherObjStatus.y < (objStatus.y + objStatus.h)) {
        return false
      }
      if (anotherObjStatus.x > (objStatus.x + objStatus.w)) {
        return false
      }
      if ((anotherObjStatus.x + anotherObjStatus.w) < objStatus.x) {
        return false
      }

      return Math.abs((objStatus.y + objStatus.h) - anotherObjStatus.y)
    },
    isBottomOfAnotherObject (obj, anotherObj) {
      return this.isTopOfAnotherObject(anotherObj, obj)
    },
    isLeftOfAnotherObject (obj, anotherObj) {
      console.log('isLeftOfAnotherObject')
      console.log(obj)
      console.log(anotherObj)
      let objStatus = this.statusOf(obj)
      let anotherObjStatus = this.statusOf(anotherObj)
      if (anotherObjStatus.x < (objStatus.x + objStatus.w)) {
        return false
      }
      if (anotherObjStatus.y > (objStatus.y + objStatus.h)) {
        return false
      }
      if ((anotherObjStatus.y + anotherObjStatus.h) < objStatus.y) {
        return false
      }

      return Math.abs((objStatus.x + objStatus.w) - anotherObjStatus.x)
    },
    isRightOfAnotherObject (obj, anotherObj) {
      return this.isLeftOfAnotherObject(anotherObj, obj)
    },
    getConstraintToObjectMessage (which) {
      console.log()
      return this.selectedObjectStatus[which].toObject === '0' ? 'Screen' : document.getElementById('al-object-' + this.selectedObjectStatus[which].toObject).getAttribute('al-name')
    },
    getSiblings (ele) {
      let list = []
      let parent = ele.parentNode
      while (!(parent.className.indexOf('al-page') !== -1 || parent.className.indexOf('al-view') !== -1)) {
        parent = parent.parentNode
      }
      // console.log(parent)
      if (parent.className.indexOf('al-page') !== -1) {
        let children = parent.children
        for (let i = 0; i < children.length; i++) {
          list = [...list, children[i]]
        }
      }
      if (parent.className.indexOf('al-view') !== -1) {
        let children = parent.getElementsByClassName('children')[0].children
        for (let i = 0; i < children.length; i++) {
          list = [...list, children[i]]
        }
      }
      return list
    },
    updateSelectedObjectStatus () {
      let temp = {}
      temp.width = parseFloat(this.selectedObjectComputedStyle.width)
      temp.height = parseFloat(this.selectedObjectComputedStyle.height)

      let toObject = '0'
      if (this.selectedObjectEle.getAttribute('al-level') > '1') {
        let containnerEle = this.selectedObjectEle.parentNode
        while (containnerEle.className.indexOf('al-view') === -1) {
          containnerEle = containnerEle.parentNode
        }
        toObject = containnerEle.getAttribute('al-id')
      }
      temp.leading = {
        toObject,
        value: parseFloat(this.selectedObjectComputedStyle.left)
      }
      temp.trailing = {
        toObject,
        value: parseFloat(this.selectedObjectComputedStyle.right)
      }
      temp.top = {
        toObject,
        value: parseFloat(this.selectedObjectComputedStyle.top)
      }
      temp.bottom = {
        toObject,
        value: parseFloat(this.selectedObjectComputedStyle.bottom)
      }
      let obj = this.selectedObjectEle
      let siblings = this.getSiblings(obj)
      for (let i = 0; i < siblings.length; i++) {
        let anotherObj = siblings[i]
        if (anotherObj !== obj) {
          let leadingSpace = this.isLeftOfAnotherObject(anotherObj, obj)
          let trailingSpace = this.isRightOfAnotherObject(anotherObj, obj)
          let topSpace = this.isTopOfAnotherObject(anotherObj, obj)
          let bottomSpace = this.isBottomOfAnotherObject(anotherObj, obj)
          if (leadingSpace !== false && leadingSpace < temp.leading.value) {
            temp.leading.value = leadingSpace
            temp.leading.toObject = anotherObj.getAttribute('al-id')
            continue
          }
          if (trailingSpace !== false && trailingSpace < temp.trailing.value) {
            temp.trailing.value = trailingSpace
            temp.trailing.toObject = anotherObj.getAttribute('al-id')
            continue
          }
          if (topSpace !== false && topSpace < temp.top.value) {
            temp.top.value = topSpace
            temp.top.toObject = anotherObj.getAttribute('al-id')
            continue
          }
          if (bottomSpace !== false && bottomSpace < temp.bottom.value) {
            temp.bottom.value = bottomSpace
            temp.bottom.toObject = anotherObj.getAttribute('al-id')
            continue
          }
        }
      }
      // 同时更新所有状态
      this.selectedObjectStatus = temp
    },
    addConstraintBtnOnClick () {
      for (let i = 0; i < this.selection.length; i++) {
        let attr = this.selection[i]
        let toItem = ''
        // 边距
        if (attr.indexOf('space') !== -1) {
          toItem = this.selectedObjectStatus[this.getStandardConstraintName(attr)].toObject
        }
        // 与 Screen 对齐
        if (attr.indexOf('in-box') !== -1) {
          toItem = '0'
        }
        // 与 Screen 等宽高
        if (attr.indexOf('to-box') !== -1) {
          toItem = '0'
        }
        this.addConstraint(toItem, attr)
      }
      this.selection = []
      this.$store.commit(SET_SIZE_CONSTRAINT_EDITOR, false)
    },
    addConstraint (toItem, attr) {
      console.log(toItem)
      console.log(attr)
      // toItem 是 约束第二方 的 id
      // attr 是 约束第一方 约束的属性名称
      let obj = document.getElementById(`al-object-${this.selectedObject || this.selectedObjects[0]}`)
      let c = {}
      c.item = obj.getAttribute('al-id')
      c.attribute = this.getStandardConstraintName(attr)
      c.relatedBy = 'equal'
      c.toItem = toItem
      if (attr.indexOf('space') !== -1 && attr.indexOf('align') === -1) {
        switch (c.attribute) {
          case 'leading':
            c.toAttribute = 'trailing'
            break
          case 'trailing':
            c.toAttribute = 'leading'
            break
          case 'top':
            c.toAttribute = 'bottom'
            break
          case 'bottom':
            c.toAttribute = 'top'
            break
        }
      } else {
        c.toAttribute = c.attribute
      }
      c.multiplier = 1
      if (attr.indexOf('space') !== -1 && attr.indexOf('align') === -1) {
        c.constant = this.selectedObjectStatus[c.attribute].value
      } else if (attr === 'c-width' || attr === 'c-height') {
        c.constant = this.selectedObjectStatus[c.attribute]
      } else {
        c.constant = 0
      }
      this.$store.commit(ADD_CONSTRAINT, c)
    },
    getStandardConstraintName (name) {
      switch (name) {
        case 'c-width':
          return 'width'
        case 'c-height':
          return 'height'
        case 'c-leading-space':
          return 'leading'
        case 'c-trailing-space':
          return 'trailing'
        case 'c-top-space':
          return 'top'
        case 'c-bottom-space':
          return 'bottom'
        case 'c-herizontally-in-box':
          return 'centerX'
        case 'c-vertically-in-box':
          return 'centerY'
        case 'c-equal-width':
          return 'width'
        case 'c-equal-height':
          return 'height'
        case 'c-equal-width-to-box':
          return 'width'
        case 'c-equal-height-to-box':
          return 'height'
        case 'c-align-leading-edges':
          return 'leading'
        case 'c-align-top-edges':
          return 'top'
        case 'c-align-traling-edges':
          return 'trailing'
        case 'c-align-bottom-edges':
          return 'bottom'
        case 'c-horizontally-align':
          return 'centerX'
        case 'c-vertically-align':
          return 'centerY'
      }
    },
    getConstraintText (c) {
      switch (c.attribute) {
        case 'width':
          if (c.toItem === '') {
            return 'Width Equals'
          }
          if (c.multiplier !== 1 || c.constant !== 0) {
            return 'Proportional Width to'
          }
          return 'Equal Width to'
        case 'height':
          if (c.toItem === '') {
            return 'Height Equals'
          }
          if (c.multiplier !== 1 || c.constant !== 0) {
            return 'Proportional Height to'
          }
          return 'Equal Height to'
        case 'leading':
          return 'Leading Space to'
        case 'trailing':
          return 'Trailing Space to'
        case 'top':
          return 'Top Space to'
        case 'bottom':
          return 'Bottom Space to'
        case 'centerX':
          return 'Align Center X to'
        case 'centerY':
          return 'Align Center Y to'
      }
    }
  }
}
</script>

<style scoped>
.size-constraint-editor {
  position: absolute;
  background: rgba(254,254,254,1);
  background: -moz-linear-gradient(top, rgba(254,254,254,1) 0%, rgba(254,254,254,1) 0%, rgba(235,235,235,1) 100%);
  background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(254,254,254,1)), color-stop(0%, rgba(254,254,254,1)), color-stop(100%, rgba(235,235,235,1)));
  background: -webkit-linear-gradient(top, rgba(254,254,254,1) 0%, rgba(254,254,254,1) 0%, rgba(235,235,235,1) 100%);
  background: -o-linear-gradient(top, rgba(254,254,254,1) 0%, rgba(254,254,254,1) 0%, rgba(235,235,235,1) 100%);
  background: -ms-linear-gradient(top, rgba(254,254,254,1) 0%, rgba(254,254,254,1) 0%, rgba(235,235,235,1) 100%);
  background: linear-gradient(to bottom, rgba(254,254,254,1) 0%, rgba(254,254,254,1) 0%, rgba(235,235,235,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fefefe', endColorstr='#ebebeb', GradientType=0 );
  
  box-shadow: 0 0 5px rgba(0,0,0,0.25);

  width: 259px;
  display: flex;
  flex-direction: column;

  bottom: 32px;
  margin-left: 4px;

  padding-bottom: 15px;

  font-size: 10px;
  font-weight: 600;
}
.size-constraint-editor:after, .size-constraint-editor:before {
  top: 100%;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.size-constraint-editor:after {
  border-top-color: rgba(235, 235, 235, 1);
  border-width: 4px;
  margin-left: -4px;
}
.size-constraint-editor:before {
  border-top-color: rgba(235, 235, 235, 1);
  border-width: 5px;
  margin-left: -5px;
}

.title {
  text-align: left;
  padding: 8px 0px 15px 5px;
  font-size: 12px;
  font-weight: 600;
}
.section-title {
  text-align: left;
  padding: 0 0 4px 8px;
  font-size: 12px;
  font-weight: 600;
}
.section-separator {
  margin: 5px 0;
  width: 100%;
  height: 1px;
  background-color: rgba(168, 168, 168, 0.2);
}
.cell {
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0 5px;
}
.cell>span {
  margin-left: 3px;
}
.spacing-note {
  text-align: left;
  color: #7f8c8d;
  padding-left: 26px;
}
.left {
  flex: 8;

  text-align: left;
}
.right{
  flex: 2;
}
input.right {
  width: 100%;
}
.button {
  cursor: pointer;
  margin: 15px 6px 0 6px;
  padding: 2px 0;
  border: 1px #2c3e50 solid;
  border-radius: 5px;
}
</style>
