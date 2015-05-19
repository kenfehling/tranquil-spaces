var _ = require('lodash');

var constants = {
    MAP: {
        DEFAULT_CENTER: { lat: 40.915, lng: -73.1234 },
        ZOOM: 17
    },
    CHECKPOINTS: [
        { lat: 40.915627, lng: -73.121555 },
        { lat: 40.916747, lng: -73.122261 },
        { lat: 40.917646, lng: -73.122339 },
        { lat: 40.917718, lng: -73.123742 },
        { lat: 40.921641, lng: -73.123224 }
    ],
    LOCATION_THRESHOLD_DEGREES: 0.0001,
    GPS_UPDATE_INTERVAL: 5000,
    INTRO_PAUSE: 1000,
    MENU: {
        LOCATION: 'menu_loc',
        FLAG: 'menu_flag',
        INFO: 'menu_info'
    },
    EVENT: {
        MAP_LOADED: 'map_loaded',
        LOCATION_MOVED: 'loc_moved',
        INTRO_START: 'intro_start',
        INTRO_END: 'intro_end',
        CHECKPOINT_REACHED: 'cp_reach'
    }
};
module.exports = constants;