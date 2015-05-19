var $ = require('jquery');
var _ = require('lodash');
var noty = require('noty');
var gmaps = require('./gmaps');
var pubsub = require('pubsub-js');
var constants = require('./constants');
var util = require('./util');

$(function() {
    "use strict";
    showIntro();   //stranged
});

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

    function menuInfoPressed() {
        alert(
            "Concept and audio by Monica Bello\n\n" +
            "App developed by Ken Fehling"
        );
        //https://github.com/kenfehling/tranquil-spaces
    }

    pubsub.subscribe(constants.EVENT.LOCATION_MOVED, locationMoved);
    pubsub.subscribe(constants.MENU.LOCATION, menuLocationPressed);
    pubsub.subscribe(constants.MENU.INFO, menuInfoPressed);
});

function showIntro() {
    "use strict";
    noty({
        text: "Welcome to the tranquil places soundwalk.<br><br>Press to begin.",
        type: 'alert',
        layout: 'center',
        callback: {
            onClose: _.bind(pubsub.publish, {}, constants.EVENT.INTRO)
        }
    });
}