var $ = require('jquery');
var _ = require('lodash');
var pubsub = require('pubsub-js');
var gmaps = require('./gmaps');
var util = require('./util');
var constants = require('./constants');
var markers = [];
var nextCheckpoint = 0;

pubsub.subscribe(constants.EVENT.MAP_LOADED, function() {
    "use strict";
    setupNextCheckpoint();
});

function checkpointReached(index) {
    "use strict";
    var marker = markers[index];
    marker.setIcon(util.icon("green_flag"));
    if (index >= constants.CHECKPOINTS.length - 1) {
        nextCheckpoint = 0;
    }
    else {
        marker.close();
        nextCheckpoint = index + 1;
        setupNextCheckpoint();
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
}

pubsub.subscribe(constants.EVENT.LOCATION_MOVED, function(msg, location) {
    "use strict";
    var checkpoint = constants.CHECKPOINTS[nextCheckpoint];
    if (util.areClose(location, checkpoint)) {
        checkpointReached(nextCheckpoint);
    }
});

pubsub.subscribe(constants.MENU.FLAG, function() {
    "use strict";
    var pos = markers[nextCheckpoint].position;
    gmaps.setCenter(pos.lat(), pos.lng());
});