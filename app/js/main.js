/*jshint strict: true */
/*global require, google */

var $ = require('jquery');
var _ = require('lodash');
var gmaps = require('./gmaps');
var pubsub = require('pubsub-js');
var constants = require('./constants');

$(function() {
    "use strict";
    var $audio = $('audio').get()[0];
    //$audio.play();

    pubsub.subscribe(constants.EVENT.MAP_LOADED, function() {
        showStartPoint();
    });
});

function showStartPoint() {
    "use strict";
    gmaps.addMarker({
        position: constants.MAP.START_POINT,
        icon: 'red_flag',
        title: 'Start point',
        text: 'Walk here to start the tour.'
    });
}