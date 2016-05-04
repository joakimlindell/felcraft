var express = require('express');
var config = require('./config/config');


// Setup Express
var app = express();
require('./config/express')(app);

// Register Controllers
var commonController = require('./controllers/common');
var characterController = require('./controllers/character');

/* ROUTES  */

// Common
app.get('/', commonController.index);

// Character Routes
app.get('/character/verify/:region/:server/:name', characterController.verifyExists);

app.listen(app.get('port'), function() {
  console.log('FelCraft Running on ' + app.get('port'));
});
