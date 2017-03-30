<template>
  <div class="utility-area">
    <tabbar>
      <tabbar-button 
        btnImg="./static/img/attribute-inspector" 
        btnImgFormat="svg"
      />
      <tabbar-button btnImg="./static/img/constraint-inspector" btnImgFormat="svg"/>
    </tabbar>
    <div class="inspector">
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
      <img src="../../../../static/img/filter.svg" style="margin-left: -114px;">
      <img src="../../../../static/img/cancel-button.svg" style="margin-left: 112px;"
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
import Tabbar from '../../common/Tabbar'
import TabbarButton from '../../common/TabbarButton'
import LibraryCell from './LibraryCell'
export default {
  name: 'utility-area',
  components: {
    Tabbar, TabbarButton, LibraryCell
  },
  data () {
    return {
      objects: [
        {
          name: 'Page',
          desc: 'A new page.',
          img: '../../../../static/img/objects/AL-Page.png'
        },
        {
          name: 'View',
          desc: 'Represents a rectangular region in which it draws and receives events.',
          img: '../../../../static/img/objects/AL-View.png'
        },
        {
          name: 'Label',
          desc: 'A variably sized amount of static text.',
          img: '../../../../static/img/objects/AL-Label.png'
        },
        {
          name: 'Button',
          desc: 'Intercepts touch events and sends an action message to a target object when it\'s tapped.',
          img: '../../../../static/img/objects/AL-Button.png'
        },
        {
          name: 'Image',
          desc: 'Displays a single image, or an animation described by an array of images.',
          img: '../../../../static/img/objects/AL-Image.png'
        }
      ],
      objectFilter: ''
    }
  },
  computed: {
    ...mapState({
      showObjectLibrary: state => state.UtilityArea.showObjectLibrary,
      showMediaLibrary: state => state.UtilityArea.showMediaLibrary
    }),
    filteredObjects () {
      return _.filter(this.objects, function (o) {
        let loweredKeyword = _.lowerCase(this.objectFilter)
        return (_.lowerCase(o.name).indexOf(loweredKeyword) !== -1) || (_.lowerCase(o.desc).indexOf(loweredKeyword) !== -1)
      }.bind(this))
    }
  },
  methods: {
    switchTab (which) {
      this.$store.commit(types.UTIL_AREA_SWITCH_TAB, {
        which
      })
    },
    clearFilter () {
      this.objectFilter = ''
    }
  }
}
</script>

<style scoped>
.utility-area {
  width: 259px;
  height: calc(100vh - 38px);

  border: solid #b2b2b2;
  border-width: 0 0 0 1px;

  background: rgba(239,239,239,0.4);
}
.inspector {
  width: 100%;
  height: calc(100% - 228px - 29px - 29px);

  border: solid #b2b2b2;
  border-width: 0 0 1px 0;
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
