/*jshint strict: true */
/*global require, module */

var $ = require('jquery');
var _ = require('lodash');
var pubsub = require('pubsub-js');
var constants = require('./constants');

$(function() {
    "use strict";
    var $location = $('#location');
    var $flag = $('#flag');
    var $info = $('#info');

    $location.click(_.bind(pubsub.publish, {}, constants.MENU.LOCATION));
    $flag.click(_.bind(pubsub.publish, {}, constants.MENU.FLAG));
    $info.click(_.bind(pubsub.publish, {}, constants.MENU.INFO));
});