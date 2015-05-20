var $ = require('jquery');
var _ = require('lodash');
var noty = require('noty');
var pubsub = require('pubsub-js');
var constants = require('./constants');

$(function() {
    "use strict";
    var $location = $('#location');
    var $flag = $('#flag');
    var $info = $('#info');
    var infoNoty;

    $location.click(_.bind(pubsub.publish, {}, constants.MENU.LOCATION));
    $flag.click(_.bind(pubsub.publish, {}, constants.MENU.FLAG));

    $info.click(function() {
        if (infoNoty) {
            infoNoty.close();
            infoNoty = null;
        }
        else {
            var div = document.createElement('div');
            var $div = $(div);
            var $github = $(document.createElement('a'));
            $github.attr('href', 'http://github.com/kenfehling/tranquil-spaces');
            $github.text('GitHub');
            $github.attr('target', '_blank');
            $div.addClass("notification");
            $div.append("<p>Concept and narration by Monica Bello</p>");
            $div.append("<p>App developed by Ken Fehling</p>");
            $div.append($github);
            $div.append("<br><br>");
            infoNoty = noty({
                text: div,
                type: 'alert',
                layout: 'center'
            });
        }
    });

    showIntro();
});

function showIntro() {
    "use strict";
    var div = document.createElement('div');
    var $div = $(div);
    $div.addClass("notification");
    $div.append("<p>Welcome to the tranquil places soundwalk.</p>");
    $div.append("<p>Press to begin.</p>");
    noty({
        text: div,
        type: 'alert',
        layout: 'center',
        callback: {
            onClose: _.bind(pubsub.publishSync, {}, constants.EVENT.INTRO_START)
        }
    });
}