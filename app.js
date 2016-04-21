var express = require('express');
var config = require('./config/config');


// Setup Express
var app = express();
require('./config/express')(app);

// Register Controllers
var commonController = require('./controllers/common');
var characterController = require('./controllers/character');

// Register Routes
app.get('/', commonController.index);

app.listen(app.get('port'), function() {
  console.log('FelCraft Running on ' + app.get('port'));
});
