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
    setupNextCheckpoint();  // Google sucks!
});

function checkpointReached(index) {
    "use strict";
    markers[index].icon = util.icon("green_flag");
    if (index >= constants.CHECKPOINTS.length - 1) {
        nextCheckpoint = 0;
    }
    else {
        nextCheckpoint = index + 1;
        setupNextCheckpoint();
    }
}

function createMarkerContent(text, buttonText, buttonOnClick) {
    "use strict";
    var div = document.createElement('div');
    var $div = $(div);
    var $p = $(document.createElement('p'));
    var $button = $(util.button(buttonText, buttonOnClick));
    $p.text(text);
    $div.append($p);
    $div.append($button);
    return div;
}

function setupNextCheckpoint() {
    "use strict";
    var content = createMarkerContent(
        'Walk here to start the tour.',
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