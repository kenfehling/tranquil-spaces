var $ = require('jquery');
var _ = require('lodash');
var pubsub = require('pubsub-js');
var util = require('./util');
var constants = require('./constants');

pubsub.subscribe(constants.EVENT.CHECKPOINT_REACHED, function(msg, index) {
    "use strict";
    var audio = $('audio').get()[0];
});