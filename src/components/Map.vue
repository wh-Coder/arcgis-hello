<template>
    <div class="arcgisMap">
        <h1>{{ msg }}</h1>
        <div id="mapDiv"></div>
        <div id="legendDiv"></div>
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
    methods: {
        createMap() {
            let map
            // first, we use Dojo's loader to require the map class
            esriLoader.dojoRequire([
                'esri/map',
                "esri/arcgis/utils",
                "esri/dijit/Legend",
            ], (Map, arcgisUtils, Legend) => {
                // create map with the given options at a DOM node w/ id 'mapNode'
                // let map = new Map('mapNode', {
                //     center: [-118, 34.5],
                //     zoom: 8,
                //     basemap: 'dark-gray'
                // });
                arcgisUtils.createMap("1a40fa5cc1ab4569b79f45444d728067", "mapDiv").then(function(response) {
                    map = response.map;

                    var legend = new Legend({
                        map: map,
                        layerInfos: (arcgisUtils.getLegendLayers(response))
                    }, "legendDiv");

                    legend.startup();
                });
            });
        }
    },
    mounted() {
        // has the ArcGIS API been added to the page?
        if (!esriLoader.isLoaded()) {
            // no, lazy load it the ArcGIS API before using its classes
            esriLoader.bootstrap((err) => {
                if (err) {
                    console.error(err);
                } else {
                    // once it's loaded, create the map
                    this.createMap();
                }
            }, {
                    // use a specific version instead of latest 4.x
                    url: 'https://js.arcgis.com/3.22/'
                });
        } else {
            // ArcGIS API is already loaded, just create the map
            this.createMap();
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/* esri styles */

@import url('https://js.arcgis.com/3.22/esri/css/esri.css');

.arcgisMap 
    font-size 12px
    width 100%
    height 100%
    #legendDiv
        background-color #fff
        position absolute !important
        z-index 99
        top 10px
        right 20px
</style>
