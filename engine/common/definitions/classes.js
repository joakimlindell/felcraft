/* engine/common/definitions/classes.js
 *
 * WoW Class ENUM */


// CLASS ENUM (Feb 2016)
var WoWclasses = {
    1: "warrior",
    2: "paladin",
    3: "hunter",
    4: "rogue",
    5: "priest",
    6: "death_knight",
    7: "shaman",
    8: "mage",
    9: "warlock",
    10: "monk",
    11: "druid"
}

var getName = function(classId) {
    return WoWclasses[classId];
}


module.exports = getName;
