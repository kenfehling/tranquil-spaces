var $ = require('jquery');
var _ = require('lodash');
var pubsub = require('pubsub-js');
var util = require('./util');
var constants = require('./constants');

$(function() {
    "use strict";
    var audio = document.createElement('audio');
    var $audio = $(audio);
    audio.src = 'audio/intro.mp3';

    pubsub.subscribe(constants.EVENT.INTRO_START, function() {
        audio.play();
        $audio.on('ended', onIntroEnd);
        $audio.on('ended', function() {
            pubsub.publish(constants.EVENT.AUDIO_FINISHED);
        });
    });

    pubsub.subscribe(constants.EVENT.CHECKPOINT_REACHED, function(msg, index) {
        audio.src = 'audio/' + (index + 1) + '.mp3';
        audio.play();
    });

    function onIntroEnd() {
        $audio.off('ended', onIntroEnd);
        setTimeout(function() {
            pubsub.publish(constants.EVENT.INTRO_END);
            audio.src = 'audio/0.mp3';
            audio.play();
        }, constants.INTRO_PAUSE);
    }
});