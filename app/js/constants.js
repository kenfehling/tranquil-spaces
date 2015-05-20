var constants = {
    MAP: {
        DEFAULT_CENTER: { lat: 40.915, lng: -73.1234 },
        ZOOM: 18
    },
    CHECKPOINTS: [
        { lat: 40.915627, lng: -73.121555 },
        { lat: 40.916747, lng: -73.122261 },
        { lat: 40.917646, lng: -73.122339 },
        { lat: 40.917718, lng: -73.123742 },
        { lat: 40.919957, lng: -73.123262 },
        { lat: 40.920774, lng: -73.124992 },
        { lat: 40.921562, lng: -73.124319 },
        { lat: 40.922187, lng: -73.123930 },
        { lat: 40.922470, lng: -73.123981 }
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
        CHECKPOINT_REACHED: 'cp_reach',
        AUDIO_FINISHED: 'audio_fin'
    }
};
module.exports = constants;