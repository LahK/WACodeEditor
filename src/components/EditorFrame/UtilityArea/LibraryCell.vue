<template>
  <div class="library-cell" 
    @dragstart="onDragStart(name, $event)"
    draggable
  >
    <img :src="img" draggable="false">
    <p>
      <span>{{ name }}</span> - {{ desc }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'library-cell',
  props: ['name', 'desc', 'img'],
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    onDragStart (name, e) {
      e.dataTransfer.setData('text/plain', name)
    }
  }
}
</script>

<style scoped>
.library-cell {
  width: 100%;
  height: 62px;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-bottom: 1px solid rgba(93, 93, 93, 0.2);
}
img {
  width: 45px;
  height: 45px;

  padding: 7.5px;
}
p {
  font-size: 11px;
  height: 39px;
  width: calc(100% - 60px);

  text-align: left;
  overflow: scroll;
  text-overflow: ellipsis;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
}
span {
  font-size: 12px;
  font-weight: bold;
}
</style>
