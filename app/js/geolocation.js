/*jshint strict: true */
/*global require, google, module */

var pubsub = require('pubsub-js');
var constants = require('./constants');
var gmaps = require('./gmaps');
var marker;

pubsub.subscribe(constants.EVENT.MAP_LOADED, function() {
    "use strict";
    navigator.geolocation.watchPosition(function(location) {
        var latlng = new google.maps.LatLng(
            location.coords.latitude,
            location.coords.longitude
        );
        if (marker) {
            marker.position = latlng;
        }
        else {
            marker = gmaps.addMarker({
                position: latlng,
                icon: 'chakra',
                title: 'Your location',
                text: 'Your location'
            });
        }
    });
});
