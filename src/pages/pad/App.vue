<template>
<div id="app">
  <!-- <img src="./assets/logo.png"> -->
  <!-- <router-view/> -->
  <pad-main/>
</div>
</template>

<script>
import PadMain from './components/PadMain.vue'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  },
  components: {
    PadMain
  },
  beforeDestroy() {}
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
body{
  padding: 0;
  margin: 0;
  & * {
    box-sizing: border-box;
  }
}
</style>
