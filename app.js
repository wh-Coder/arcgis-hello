require([
    'esri/Map',
    'esri/views/SceneView',
    'vue'
], function (Map, SceneView, Vue) {
    Vue.component('camera-info', {
        props: ['camera'],
        template: "<div>" +
        "<h2>Camera Details</h2>" +
        "<p><strong>Heading</strong>:{{ camera.heading.toFixed(3) }}</p>" +
        "<p><strong>Title</strong>: {{ camera.tilt.toFixed(3) }}</p>" +
        "<p><strong>Latitude</strong>: {{ camera.position.latitude.toFixed(3) }}</p>" +
        "<p><strong>Longitude</strong>: {{ camera.position.longitude.toFixed(3) }}</p>" +
        "</div>"
    })

    var map = new Map({
        basemap: "streets",
        ground: "world-elevation"
    })

    var view = new SceneView({
        container: "viewDiv",
        map: map,
        scale: 50000000,
        center: [-101.17, 21.78]
    })

    view.then(function () {
        var info = new Vue({
            el: "#info",
            data: {
                camera: view.camera
            }
        })
        view.ui.add(info.$el, "top-right")
        view.watch("camera", function () {
            info.camera = view.camera;
        })
    })
})