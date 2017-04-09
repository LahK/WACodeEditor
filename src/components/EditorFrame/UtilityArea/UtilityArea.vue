<template>
  <div class="utility-area">
    <tabbar>
      <tabbar-button 
        btnImg="./static/img/attribute-inspector" 
        btnImgFormat="svg"
        :bindActive="showAttributeInspector"
        @click="switchInspector('attr')"
      />
      <tabbar-button 
        btnImg="./static/img/constraint-inspector" 
        btnImgFormat="svg"
        :bindActive="showConstraintInspector"
        @click="switchInspector('c')"
      />
    </tabbar>
    <div class="attribute-inspector" v-show="showAttributeInspector">
      <template v-if="selectedObject !== null">
      <div class="inspector-title">{{ selectedObjectType }}</div>
      <div class="inspector-section" v-if="Object.keys(attributes.data).length !== 0">
        <component 
          v-for="(val, key, index) in attributes.data"
          is="inspector-data-cell"
          :displayName="key"
          :dataName="val"
          :selectedObject="selectedObject"
          :key="index"
        />
      </div>
      <div class="inspector-section">
      <component 
        v-for="(val, key, index) in attributes.style"
        :is="isCustomStyle(val) ? 'inspector-custom-select-cell' : 'inspector-input-cell'"
        :displayName="key"
        :styleName="val"
        :selectedObject="selectedObject"
        :key="index"
      />
      </div>
      </template>
    </div>
    <div class="constraint-inspector" v-show="showConstraintInspector">
      <template v-if="selectedObject !== null && selectedConstraint === null">
        <div class="title">Constraints</div>
      <div
        class="constraint-cell"
        v-for="item in constraintsOfSelectedObject"
        >
        <div class="constraint-cell-row1">
          <span>{{ getConstraintText(item) }}:</span>
          <span>{{ item.toItem === '' ? item.constant : item.toItem === '0' ? 'Screen' : item.toItem != selectedObjectEle.getAttribute('al-id') ? getAlNameById(item.toItem) : getAlNameById(item.item) }}</span>
        </div>
        <div
          class="constraint-cell-row2"
          v-if="(item.toItem !== '' && (item.constant !== 0 || item.multiplier !== 1))"
          >
          <span></span>
          <span>{{ item.multiplier != 1 ? 'x'+item.multiplier : '' }}</span>
          <span>{{ item.constant != 0 ? '+'+item.constant : '' }}</span>
          <span></span>
        </div>
        <div class="constraint-cell-row3">
          <div class="button edit" @click="editConstraint(item)">Edit</div>
        </div>
      </div>
      </template>
      <template v-if="selectedConstraint !== null">
        <div class="title">Edit Constraint</div>
        <constraint-edit-cell
          cellName="Object"
          :cellValue="getAlNameById(selectedConstraint.item)"
          :canEdit="false"
        />
        <constraint-edit-cell
          cellName="Attribute"
          :cellValue="selectedConstraint.attribute"
          :canEdit="false"
        />
        <constraint-edit-cell
          cellName="Relation"
          :cellValue="selectedConstraint.relatedBy"
          :canEdit="false"
        />
        <constraint-edit-cell
          cellName="To Object"
          :cellValue="selectedConstraint.toItem === '' ? 'null' : selectedConstraint.toItem === '0' ? 'Screen' : selectedConstraint.toItem != selectedObjectEle.getAttribute('al-id') ? getAlNameById(selectedConstraint.toItem) : getAlNameById(selectedConstraint.item)"
          :canEdit="false"
        />
        <constraint-edit-cell
          cellName="To Attribute"
          :cellValue="selectedConstraint.toAttribute"
          :canEdit="false"
        />
        <constraint-edit-cell
          cellName="Multiplier"
          :cellValue="selectedConstraint.multiplier"
          :canEdit="true"
        />
        <constraint-edit-cell
          cellName="Constant"
          :cellValue="selectedConstraint.constant"
          :canEdit="true"
        />
        <div class="button dismiss" @click="closeEditConstraint">Dismiss</div>
      </template>
    </div>
    <div class="libraries">
      <tabbar>
        <tabbar-button 
          isActive="true" 
          btnImg="./static/img/object-library" 
          btnImgFormat="svg"
          :bindActive="showObjectLibrary"
          @click="switchTab('obj')"
        />
        <tabbar-button 
          btnImg="./static/img/media-library" 
          btnImgFormat="svg"
          :bindActive="showMediaLibrary"
          @click="switchTab('media')"
        />
      </tabbar>
      <div class="library" v-show="showObjectLibrary">
        <library-cell 
          v-for="(item, index) in filteredObjects"
          :key="index"
          :name="item.name"
          :desc="item.desc"
          :img="item.img"
        />
      </div>
    </div>
    <div class="filter">
      <input type="text" name="object-filter" v-model="objectFilter">
      <img src="static/img/filter.svg" style="margin-left: -114px;">
      <img src="static/img/cancel-button.svg" style="margin-left: 112px;"
        @click="clearFilter"
        v-show="objectFilter !== ''"
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import * as types from '../../../store/mutation-types'
import Config from '../../../Config'
import Tabbar from '../../common/Tabbar'
import TabbarButton from '../../common/TabbarButton'
import LibraryCell from './LibraryCell'
import InspectorInputCell from './InspectorInputCell'
import InspectorCustomSelectCell from './InspectorCustomSelectCell'
import InspectorDataCell from './InspectorDataCell'
import ConstraintEditCell from './ConstraintEditCell'
export default {
  name: 'utility-area',
  components: {
    Tabbar, TabbarButton, LibraryCell, InspectorInputCell, InspectorCustomSelectCell, InspectorDataCell, ConstraintEditCell
  },
  data () {
    return {
      objects: Config.objects,
      objectFilter: ''
    }
  },
  computed: {
    ...mapState({
      showObjectLibrary: state => state.UtilityArea.showObjectLibrary,
      showMediaLibrary: state => state.UtilityArea.showMediaLibrary,
      showAttributeInspector: state => state.UtilityArea.showAttributeInspector,
      showConstraintInspector: state => state.UtilityArea.showConstraintInspector,
      selectedObject: state => state.Events.selectedObject,
      constraints: state => state.Events.constraints,
      selectedConstraint: state => state.Events.selectedConstraint
    }),
    filteredObjects () {
      return _.filter(this.objects, function (o) {
        let loweredKeyword = _.lowerCase(this.objectFilter)
        return (_.lowerCase(o.name).indexOf(loweredKeyword) !== -1) || (_.lowerCase(o.desc).indexOf(loweredKeyword) !== -1)
      }.bind(this))
    },
    attributes () {
      let type = document.getElementById(`al-object-${this.selectedObject}`).getAttribute('al-type')
      return Config.attributes[type]
    },
    selectedObjectEle () {
      return document.getElementById(`al-object-${this.selectedObject}`)
    },
    selectedObjectComputedStyle () {
      return window.getComputedStyle(this.selectedObjectEle)
    },
    selectedObjectType () {
      let string = this.selectedObjectEle.getAttribute('al-type').substring(3)
      let typeName = string.charAt(0).toUpperCase() + string.slice(1)
      return typeName
    },
    // 获取选中组件相关的约束
    constraintsOfSelectedObject () {
      let list = []
      let id = this.selectedObject
      for (let i = 0; i < this.constraints.length; i++) {
        let c = this.constraints[i]
        console.log(c.item)
        console.log(c.toItem)
        console.log(id)
        if (c.item === id || c.toItem === id) {
          c.index = i
          list.push(c)
        }
      }
      return list
    }
  },
  methods: {
    switchTab (which) {
      this.$store.commit(types.UTIL_AREA_SWITCH_TAB, {
        which
      })
    },
    switchInspector (which) {
      this.$store.commit(types.SWITCH_UTILITY_AREA_INSPECTOR, which)
    },
    clearFilter () {
      this.objectFilter = ''
    },
    isCustomStyle (name) {
      let keys = Object.keys(Config.customStyles)
      return keys.indexOf(name) !== -1
    },
    getConstraintText (c) {
      // todo
      // !!! 此处应添加不同情况的约束文字改变。比如 父子关系元素之间的约束文字。
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
    },
    getAlNameById (id) {
      return document.getElementById(`al-object-${id}`).getAttribute('al-name')
    },
    editConstraint (c) {
      this.$store.commit(types.SET_SELECTED_CONSTRAINT, c)
    },
    closeEditConstraint () {
      this.$store.commit(types.SET_SELECTED_CONSTRAINT, null)
    }
  }
}
</script>

<style scoped>
.utility-area {
  z-index: 99;
  width: 259px;
  height: calc(100vh - 38px);

  border: solid #b2b2b2;
  border-width: 0 0 0 1px;

  background: rgba(239,239,239,0.4);
}
.attribute-inspector {
  width: 100%;
  height: calc(100% - 228px - 29px - 29px);

  border: solid #b2b2b2;
  border-width: 0 0 1px 0;
}
.inspector-title {
  text-align: left;
  padding: 5px 0px 15px 5px;

  font-size: 12px;
  font-weight: 600;
}
.inspector-section {
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px rgba(168, 168, 168, 0.2) solid;
}
.inspector-section:last-of-type {
  border-bottom: 0 none black;
}
.constraint-inspector {
  width: 100%;
  height: calc(100% - 228px - 29px - 29px);

  border: solid #b2b2b2;
  border-width: 0 0 1px 0;
}

.constraint-cell {
  color: #34495e;
  padding: 10px;
  border: solid #eee;
  border-width: 0 0 1px 0;

  display: flex;
  flex-direction: column;

  font-size: 12px;
  font-weight: 500;
}
.constraint-cell:hover {
  background-color: rgba(255, 255, 255, 0.6)
}
.constraint-cell:first-of-type {
  border-width: 1px 0 1px 0;
}
.constraint-cell-selected {
  border: 1px solid #42b983;
}
.constraint-cell-row1 {
  display: flex;
}
.constraint-cell-row1>span {
  flex: 1;
}
.constraint-cell-row1>span:first-child {
  text-align: right;
}
.constraint-cell-row1>span:nth-child(2) {
  padding-left: 10px;
  text-align: left;
}
.constraint-cell-row2 {
  display: flex;
  justify-content: space-around;
  align-items: center;

  font-size: 9px;
  line-height: 12px;
}
.constraint-cell-row2>span {
  flex: 1;
  text-align: center;
}
.constraint-cell-row3 {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.constraint-cell:hover .constraint-cell-row3 {
  height: 20px;
}
.button.dismiss {
  cursor: pointer;
  margin: 15px 6px 0 6px;
  padding: 2px 0;
  border: 1px #2c3e50 solid;
  border-radius: 5px;
  font-size: 12px;
}
.constraint-cell .button.edit {
  display: none;
  position: relative;
  margin-top: 0px;
  text-decoration: underline;
  padding: 1px 5px;
  font-size: 10px;
  cursor: pointer;
}
.constraint-cell:hover .button.edit {
  display: block;
}

div.title {
  padding: 5px;
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 10px;
}


.libraries {
  width: 100%;
  height: 228px;
}
.library {
  width: 100%;
  height: calc(100% - 29px);
  overflow: scroll;
}
.filter {
  width: 100%;
  height: 29px;

  display: flex;
  justify-content: center;
  align-items: center;
}
.filter input {
  width: 88%;
  border-radius: 5px;
  padding-left: 15px;
  border-width: 0.5px;
  border-style: solid;
  border-color: #bcbcbc;
}
.filter input:focus {
    outline: none !important;
    border:1px solid #929292;
}
.filter img {
  position: absolute;
  width: 12px;
  height: 12px;
}
</style>
