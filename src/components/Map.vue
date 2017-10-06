<template>
    <div class="arcgisMap">
        <h1>{{ msg }}</h1>
        <div id="search"></div>
        <div id="mapDiv"></div>
        <div id="legendDiv"></div>
        <div id="basemapGallery"></div>
        <div id="dir"></div>
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
                "esri/dijit/Search",
                "esri/dijit/Directions",
                "esri/dijit/BasemapGallery",
                "esri/arcgis/utils",
                "esri/dijit/Legend",
            ], (Map, Search, Directions, BasemapGallery, arcgisUtils, Legend) => {
                // create map with the given options at a DOM node w/ id 'mapNode'
                let map = new Map('mapDiv', {
                    center: [-105.255, 40.022],
                    zoom: 10,
                    basemap: 'topo'
                });

                var search = new Search({
                    map: map,
                }, "search");

                search.startup();

                map.on("load", () => {
                    console.log('load')
                });
                search.on("select-result", () => {
                    console.log('select-result')
                });
                search.on("clear-search", () => {
                    console.log('clear-search')
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
// #search 
//     display: block
//     position: absolute
//     z-index: 3
//     top: 20px
//     left: 75px
</style>
