var $ = require('jquery');
var _ = require('lodash');
var pubsub = require('pubsub-js');
var util = require('./util');
var constants = require('./constants');

$(function() {
    "use strict";
    var audio = document.createElement('audio');

    pubsub.subscribe(constants.EVENT.CHECKPOINT_REACHED, function(msg, index) {
        audio.src = "audio/narration.mp3";
        audio.play();
    });
});