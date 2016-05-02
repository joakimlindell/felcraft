/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
    res.render('home', {
        title: 'Home'
    });
};

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

    // temporary always OK response
    res.status(200).send({ 'message': 'OK' });
}
