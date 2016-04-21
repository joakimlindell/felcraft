/* engine/common/definitions/races.js
 *
 * WoW Race ENUM */


// Race ENUM (Feb 2016)
var WoWraces = {
    1: "human",
    2: "orc",
    3: "dwarf",
    4: "nightelf",
    5: "undead",
    6: "tauren",
    7: "gnome",
    8: "troll",
    10: "bloodelf",
    11: "draenai",
    22: "worgen",
    24: "pandaren"
}

var getName = function(raceId) {
    return WoWraces[raceId];
}

module.exports = getName;
