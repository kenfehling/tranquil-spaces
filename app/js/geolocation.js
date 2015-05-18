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
    pubsub.publish(constants.EVENT.LOCATION_MOVED, {
        lat: location.coords.latitude,
        lng: location.coords.longitude
    });
}

function onError(data) {
    "use strict";
    alert(data.message);
}