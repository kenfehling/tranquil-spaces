/*jshint strict: true */
/*global module */

var constants = {
    MAP: {
        DEFAULT_CENTER: { lat: 40.915, lng: -73.1234 },
        ZOOM: 17,
        START_POINT: { lat: 40.917410, lng: -73.122160 },
        END_POINT: { lat: 40.921641, lng: -73.123224 }
    },
    LOCATION_THRESHOLD_DEGREES: 0.0001,
    MENU: {
        LOCATION: 'menu_loc',
        FLAG: 'menu_flag',
        INFO: 'menu_info'
    },
    EVENT: {
        MAP_LOADED: 'map_loaded',
        LOCATION_MOVED: 'loc_moved',
        ENTERED_START: 'enter_start',
        ENTERED_END: 'enter_start'
    }
};
module.exports = constants;