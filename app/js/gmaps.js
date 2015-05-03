/*jshint strict: true */
/*global require, google, module */

var pubsub = require('pubsub-js');
var constants = require('./constants');
var util = require('./util');
var obj = {};

var options = {
    center: constants.MAP.DEFAULT_CENTER,
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
        var content = options.content;
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: title,
            icon: util.icon(icon)
        });
        var infoWindow = new google.maps.InfoWindow({ content: content });
        marker.open = function() {
            infoWindow.open(map, marker);
        };
        marker.close = function() {
            infoWindow.close();
        };
        marker.setContent = function(t) {
            infoWindow.content = t;
        };
        google.maps.event.addListener(marker, 'click', marker.open);
        return marker;
    };
});

module.exports = obj;