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

        if (!body.status && !body.reason) {
	    
            /* TODO: Enum definition relpacements */
            /*body.className = engine.common.definitions.Class(body.class);
            body.raceName = engine.common.definitions.Race(body.race); */

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
