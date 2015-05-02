/**
 * Express server
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module, process, __dirname, console */

var express = require('express');
var favicon = require('serve-favicon');

var app = express();
app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static(__dirname));

var router = express.Router();
router.route('/').get(function(req, res) {
    "use strict";
    res.sendFile('/index.html', { root: __dirname});
});

var port = process.env.PORT || 5000;
console.log("Serving on port " + port);
app.listen(port);