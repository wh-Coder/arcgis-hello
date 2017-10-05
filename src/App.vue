<template>
  <div id="app">
    <arcgis-map></arcgis-map>
    <!-- <hello></hello> -->
  </div>
</template>

<script>
import Hello from './components/Hello'
import arcgisMap from './components/Map'

export default {
  name: 'app',
  components: {
    Hello, arcgisMap
  }
}
</script>

<style>
@import '../static/css/reset.css';
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
