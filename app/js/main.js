/*jshint strict: true */
/*global require, google */

var $ = require('jquery');
var _ = require('lodash');
var gmaps = require('./gmaps');
var pubsub = require('pubsub-js');
var constants = require('./constants');
var util = require('./util');

pubsub.subscribe(constants.EVENT.MAP_LOADED, function() {
    "use strict";
    var audio = $('audio').get()[0];
    var startedWalk = false;
    var locationMarker;

    var startButton = document.createElement('button');
    var $startButton = $(startButton);
    $startButton.text('Start walk');
    $startButton.click(function() {
        audio.play();
    });

    var startMarker = gmaps.addMarker({
        position: constants.MAP.START_POINT,
        icon: 'red_flag',
        title: 'Start point',
        content: 'Walk here to start the tour.'
    });

    function locationMoved(msg, loc) {
        var latlng = new google.maps.LatLng(loc.latitude, loc.longitude);
        if (locationMarker) {
            locationMarker.position = latlng;
        }
        else {
            locationMarker = gmaps.addMarker({
                position: latlng,
                icon: 'chakra',
                title: 'Your location',
                content: 'Your location'
            });
        }
    }

    function enteredStart() {
        if (!startedWalk) {
            startMarker.icon = util.icon("green_flag");
            startMarker.close();
            startMarker.setContent(startButton);
            startMarker.open();
            startedWalk = true;
        }
    }

    function enteredEnd() {
        if (startedWalk) {
            locationMarker.setContent("You've finished the walk.");
            locationMarker.open();
            startedWalk = false;
        }
    }

    pubsub.subscribe(constants.EVENT.ENTERED_START, enteredStart);
    pubsub.subscribe(constants.EVENT.ENTERED_END, enteredEnd);
    pubsub.subscribe(constants.EVENT.LOCATION_MOVED, locationMoved);
});