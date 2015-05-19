var $ = require('jquery');
var _ = require('lodash');
var noty = require('noty');
var gmaps = require('./gmaps');
var pubsub = require('pubsub-js');
var constants = require('./constants');
var util = require('./util');
var infoNoty;

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

    pubsub.subscribe(constants.EVENT.LOCATION_MOVED, locationMoved);
    pubsub.subscribe(constants.MENU.LOCATION, menuLocationPressed);
    pubsub.subscribe(constants.MENU.INFO, menuInfoPressed);
});

function menuInfoPressed() {
    "use strict";
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
}

function showIntro() {
    "use strict";
    var div = document.createElement('div');
    var $div = $(div);
    $div.addClass("notification");
    $div.html("Welcome to the tranquil places soundwalk.<br><br>Press to begin.");
    noty({
        text: div,
        type: 'alert',
        layout: 'center',
        callback: {
            onClose: _.bind(pubsub.publish, {}, constants.EVENT.INTRO)
        }
    });
}