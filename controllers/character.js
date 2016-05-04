/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
    res.render('home', {
        title: 'Home'
    });
};

/* Battle.net API/Armory initiation */
var config = require('../config/config')("dev")
var bnet = require('battlenet-api')(config.battlenetapi);

/*
 - Pings the Battle.net armory to see if the character exists.
 NOTE: As DHs aren't on the armory yet it just assumes that it exists
 */
exports.verifyExists = function(req, res) {

    /* DEBUG request data */
    var region = req.params.region;
    var server = req.params.server;
    var name = req.params.name;

    console.log("Check if character ", name, region, server, "exists. OK.");

    bnet.wow.character.aggregate({
        origin: region,
        realm: server,
        name: name,
        fields: ['profile', 'items', 'talents', 'stats']
    }, function(err, body, response) {

        if(body.detail === "Account Inactive" && body.type === "Forbidden") {
          console.log("API key does not seem to be configured. Please setup config/local.js");
          res.status(403).send({ "type": body.type, "detail": body.detail });
        } else if (!body.status && !body.reason) {
            res.status(200).send(body);
        } else if (body.reason === "Character not found.") {
            res.status(404).send({ "status": body.status, "reason": body.reason });
        } else {
            res.status(500).send({ "status": body.status, "reason": body.reason });
        }
    });

    // temporary always OK response
    //res.status(200).send({ 'message': 'OK' });
}
