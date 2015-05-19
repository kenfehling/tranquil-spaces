var $ = require('jquery');
var _ = require('lodash');
var pubsub = require('pubsub-js');
var util = require('./util');
var constants = require('./constants');

$(function() {
    "use strict";
    var audio = document.createElement('audio');

    pubsub.subscribe(constants.EVENT.INTRO, function() {
        audio.src = 'audio/intro.mp3';
        audio.play();
    });

    pubsub.subscribe(constants.EVENT.CHECKPOINT_REACHED, function(msg, index) {
        audio.src = 'audio/' + (index + 1) + '.mp3';
        audio.play();
    });
});