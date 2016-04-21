/* EXTERNAL EXPRESS CONFIGURATION */

var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var logger = require('morgan');
var path = require('path');
var methodOverride = require('method-override');
var config = require('./config');
var dust = require('express-dustjs');


/**
 * @module Express App
 * @param app {*}
 */
module.exports = function(app) {

    app.set('port', process.env.PORT || 3000);
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../public')));
    app.engine('dust', dust.engine({
        // Use dustjs-helpers
        useHelpers: true
    }));
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'dust');
    app.use(methodOverride());

};
