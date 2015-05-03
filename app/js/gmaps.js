/*jshint strict: true */
/*global require, google, module */

var pubsub = require('pubsub-js');
var constants = require('./constants');
var obj = {};

var options = {
    center: constants.MAP.CENTER,
    zoom: constants.MAP.ZOOM,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    zoomControl: false,
    scaleControl: false,
    streetViewControl: false
};
google.maps.event.addDomListener(window, 'load', function() {
    "use strict";
    var map = new google.maps.Map(document.getElementById('map-canvas'), options);
    pubsub.publish(constants.EVENT.MAP_LOADED, map);
    obj.map = map;
    obj.addMarker = function(options) {
        var position = options.position;
        var icon = options.icon;
        var title = options.title;
        var text = options.text;
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: title,
            icon: "img/" + icon + ".png"
        });
        var infowindow = new google.maps.InfoWindow({ content: text });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
        return marker;
    };
});

module.exports = obj;