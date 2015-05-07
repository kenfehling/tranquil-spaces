/*jshint strict: true */
/*global require, module, alert */

//var _ = require('lodash');
var pubsub = require('pubsub-js');
var constants = require('./constants');

pubsub.subscribe(constants.EVENT.MAP_LOADED, function() {
    "use strict";

    if ("geolocation" in navigator) {
        var geo = navigator.geolocation;
        var options = {
            enableHighAccuracy: true,
            maximumAge: 4000, //should be default, just in case
            timeout: constants.GPS_UPDATE_INTERVAL
        };
        geo.watchPosition(onLocationUpdated, onError, options);
        //var f = function () {
        //    geo.getCurrentPosition(onLocationUpdated, onError, options);
        //};
        //f();
        //setInterval(f, constants.GPS_UPDATE_INTERVAL);
    }
    else {
        alert("This browser doesn't support GPS.");
    }
});

function onLocationUpdated(location) {
    "use strict";
    var loc = location.coords;
    pubsub.publish(constants.EVENT.LOCATION_MOVED, loc);
    if (isCloseToStartPoint(loc.latitude, loc.longitude)) {
        pubsub.publish(constants.EVENT.ENTERED_START);
    }
    else if (isCloseToEndPoint(loc.latitude, loc.longitude)) {
        pubsub.publish(constants.EVENT.ENTERED_END);
    }
}

function onError(data) {
    "use strict";
    alert(data.message);
}

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