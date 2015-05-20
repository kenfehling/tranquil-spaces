var $ = require('jquery');
var _ = require('lodash');
var pubsub = require('pubsub-js');
var gmaps = require('./gmaps');
var util = require('./util');
var constants = require('./constants');
var markers = [];
var nextCheckpoint = 0;

function checkpointReached(index) {
    "use strict";
    var marker = markers[index];
    marker.setIcon(util.icon("green_flag"));
    if (index < constants.CHECKPOINTS.length) {
        marker.close();
        nextCheckpoint += 1;
    }
    pubsub.publish(constants.EVENT.CHECKPOINT_REACHED, index);
}

function createMarkerContent(text, buttonText, buttonOnClick) {
    "use strict";
    var div = document.createElement('div');
    var $div = $(div);
    var $p = $(document.createElement('p'));
    var $button = $(util.button(buttonText, buttonOnClick));
    $p.text(text);
    $div.addClass("markerInfo");
    $div.append($p);
    $div.append($button);
    return div;
}

function setupCheckpoint(index) {
    "use strict";
    var content = createMarkerContent(
        index === 0 ? 'Walk here to start the tour.' : 'Checkpoint ' + index,
        "I'm here",
        _.bind(checkpointReached, {}, nextCheckpoint)
    );
    var marker = gmaps.addMarker({
        position: constants.CHECKPOINTS[nextCheckpoint],
        icon: 'red_flag',
        content: content
    });
    markers.push(marker);
}

function setupNextCheckpoint() {
    "use strict";
    setupCheckpoint(nextCheckpoint);
    checkIfClose();
}

function checkIfClose() {
    "use strict";
    var checkpoint = constants.CHECKPOINTS[nextCheckpoint];
    if (util.areClose(location, checkpoint)) {
        checkpointReached(nextCheckpoint);
    }
}

function moveToFlag() {
    "use strict";
    var marker = getNextMarker();
    if (marker) {
        var pos = marker.position;
        gmaps.setCenter(pos.lat(), pos.lng());
    }
}

function getNextMarker() {
    "use strict";
    return getCheckpointMarker(nextCheckpoint);
}

function getPrevMarker() {
    "use strict";
    return getCheckpointMarker(nextCheckpoint - 1);
}

function getCheckpointMarker(index) {
    "use strict";
    return markers[index];
}

pubsub.subscribe(constants.EVENT.AUDIO_FINISHED, function() {
    "use strict";
    if (nextCheckpoint <= constants.CHECKPOINTS.length) {
        if (nextCheckpoint >= markers.length) {
            setupNextCheckpoint();
        }
    }
});

pubsub.subscribe(constants.EVENT.LOCATION_MOVED, checkIfClose);
pubsub.subscribe(constants.MENU.FLAG, moveToFlag);
pubsub.subscribe(constants.EVENT.INTRO_END, moveToFlag);