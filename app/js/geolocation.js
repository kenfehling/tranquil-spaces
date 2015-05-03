/*jshint strict: true */
/*global require, module */

var pubsub = require('pubsub-js');
var constants = require('./constants');

pubsub.subscribe(constants.EVENT.MAP_LOADED, function() {
    "use strict";

    navigator.geolocation.watchPosition(function(location) {
        var loc = location.coords;
        pubsub.publish(constants.EVENT.LOCATION_MOVED, loc);
        if (isCloseToStartPoint(loc.latitude, loc.longitude)) {
            pubsub.publish(constants.EVENT.ENTERED_START);
        }
        else if (isCloseToEndPoint(loc.latitude, loc.longitude)) {
            pubsub.publish(constants.EVENT.ENTERED_END);
        }
    });
});

function isCloseToStartPoint(latitude, longitude) {
    "use strict";
    return isCloseToPoint(
        latitude,
        longitude,
        constants.MAP.START_POINT.lat,
        constants.MAP.START_POINT.lng
    );
}

function isCloseToEndPoint(latitude, longitude) {
    "use strict";
    return isCloseToPoint(
        latitude,
        longitude,
        constants.MAP.END_POINT.lat,
        constants.MAP.END_POINT.lng
    );
}

function isCloseToPoint(lat1, lng1, lat2, lng2) {
    "use strict";
   return Math.abs(lat1 - lat2) < constants.LOCATION_THRESHOLD_DEGREES &&
          Math.abs(lng1 - lng2) < constants.LOCATION_THRESHOLD_DEGREES;
}