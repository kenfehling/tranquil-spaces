var $ = require('jquery');
var _ = require('lodash');
var gmaps = require('./gmaps');
var pubsub = require('pubsub-js');
var constants = require('./constants');
var util = require('./util');

pubsub.subscribe(constants.EVENT.MAP_LOADED, function() {
    "use strict";
    var locationMarker;

    function locationMoved(msg, loc) {
        var latlng = new google.maps.LatLng(loc.lat, loc.lng);
        if (locationMarker) {
            locationMarker.setPosition(latlng);
        }
        else {
            locationMarker = gmaps.addMarker({
                position: latlng,
                icon: 'chakra',
                title: 'Your location',
                content: 'Your location'
            });
            gmaps.setCenter(loc.lat, loc.lng);
        }
    }

    function menuLocationPressed() {
        var pos = locationMarker.position;
        gmaps.setCenter(pos.lat(), pos.lng());
    }

    pubsub.subscribe(constants.EVENT.LOCATION_MOVED, locationMoved);
    pubsub.subscribe(constants.MENU.LOCATION, menuLocationPressed);
});