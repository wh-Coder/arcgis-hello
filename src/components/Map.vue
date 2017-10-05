<template>
    <div class="arcgisMap">
        <h1>{{ msg }}</h1>
        <div id="mapNode"></div>
    </div>
</template>

<script>
// import the esri-loader library
import * as esriLoader from 'esri-loader';

export default {
    name: 'arcgisMap',
    data() {
        return {
            msg: 'arcgisMap'
        }
    },
    mounted() {

        // create a map on the page
        function createMap() {
            // first, we use Dojo's loader to require the map class
            esriLoader.dojoRequire(['esri/map'], (Map) => {
                // create map with the given options at a DOM node w/ id 'mapNode'
                let map = new Map('mapNode', {
                    center: [-118, 34.5],
                    zoom: 8,
                    basemap: 'dark-gray'
                });
            });
        }

        // has the ArcGIS API been added to the page?
        if (!esriLoader.isLoaded()) {
            // no, lazy load it the ArcGIS API before using its classes
            esriLoader.bootstrap((err) => {
                if (err) {
                    console.error(err);
                } else {
                    // once it's loaded, create the map
                    createMap();
                }
            }, {
                    // use a specific version instead of latest 4.x
                    url: 'https://js.arcgis.com/3.21/'
                });
        } else {
            // ArcGIS API is already loaded, just create the map
            createMap();
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/* esri styles */

@import url('https://js.arcgis.com/3.21/esri/css/esri.css');

.arcgisMap 
    font-size 12px
    width 100%
    height 100%
</style>
