/**
 * Express server
 * Author: Ken Fehling
 */

/*jshint strict: true */
/*global require, module, process, __dirname */

var express = require('express');
var favicon = require('serve-favicon');

var apiHost = getApiHost();
var staticDir = getStaticDir();

var app = express();
app.use(favicon(__dirname + staticDir + '/favicon.ico'));
app.use(express.static(path.join(__dirname, staticDir)));

var router = express.Router();
router.route('/').get(function(req, res) {
    "use strict";
    res.sendFile(staticDir + '/index.html', { root: __dirname});
});