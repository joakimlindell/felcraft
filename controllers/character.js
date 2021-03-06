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
        
        body.talents = normaliseCalcTalent(findCalcTalentByRole("DPS", body.talents));

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
    
    /* Splits talent data from Battle.net API for Felcraft
     * Example:
     * string calcTalent = "1000002" 
     * converts into:
     * Array  arrTalents = [1,0,0,0,0,0,2]  */
    function normaliseCalcTalent(calcTalent) {
        var arrTalents = new Array(); 
        for (x=0; x<calcTalent.length; x++) {
            arrTalents.push(parseInt(calcTalent[x]));
        }                  
    	return arrTalents;
    }
    
    /* Finds the calcTalent string from the first spec matching given name 
     * Example:
     * string spec = "Brewmaster" 
     * dataTalentArr[] expected to contain talents array from
     * the Battle.net API. 
     * */
    function findCalcTalentByClassSpec(spec, dataTalentArr) {
        for(x=0; x<dataTalentArr.length; x++) {
            if(dataTalentArr[x].spec.name === spec) {
              return dataTalentArr[x].calcTalent;
            } 
        }
        console.log("Failed to find talent distribution with spec ", spec);
        return "0000000"; //failback
    }

    /* Finds the calcTalent string from the first role matching given name 
     * Example:
     * string spec = "DPS" 
     * dataTalentArr[] expected to contain talents array from
     * the Battle.net API. 
     * */
    function findCalcTalentByRole(role, dataTalentArr) {
        for(x=0; x<dataTalentArr.length; x++) {
            if(dataTalentArr[x].spec.role === role) {
              return dataTalentArr[x].calcTalent;
            } 
        }
        console.log("Failed to find talent distribution for role ", role);
        return "0000000"; //failback
    }


    // temporary always OK response
    //res.status(200).send({ 'message': 'OK' });
}
