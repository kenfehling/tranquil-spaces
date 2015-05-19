var $ = require('jquery');
var constants = require('./constants');

module.exports = {
    icon: function(name) {
        "use strict";
        return '/img/' + name + '.png';
    },
    button: function(text, onClick) {
        "use strict";
        var b = document.createElement('button');
        var $b = $(b);
        $b.text(text);
        $b.click(onClick);
        return b;
    },
    areClose: function (a, b) {
        "use strict";
        return Math.abs(a.lat - b.lat) < constants.LOCATION_THRESHOLD_DEGREES &&
               Math.abs(a.lng - b.lng) < constants.LOCATION_THRESHOLD_DEGREES;
    }
};