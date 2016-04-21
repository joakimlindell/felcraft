/* CONFIGURATION SETS */

var configs = {
    dev: {
        requestorId: 'FelCraft-Dev',
        battlenetapi: '',
        root: require('path').normalize(__dirname + '/..'),
        url: 'http://localhost',
        port: 3000,
        db: {
            host: '127.0.0.1',
            user: 'root',
            port: 3306,
            password: 'root',
            database: '',
            dateStrings: false,
            timezone: 'UTC',
            typeCast: function (field, next) {
                if (field.type === 'TINY' && field.length === 1) {
                    return (field.string() === '1');
                }
                return next();
            }
        },
        loadAllTemplates: true,
        stackError: true,
        prettyHTML: true,
        expressLog: true,
        socketLog: false,
        socketLogLevel: 3,
        datadogMock: true,
        expressLogLevel: 'dev'
    }
};

/**
 * Traverse local config file
 * @param config {*}
 * @param localConfig {*}
 */
function configTraverse (config, localConfig) {
    var keys = Object.keys(localConfig);
    keys.forEach(function (key) {
        var value = localConfig[key];
        if (typeof value !== 'object') {
            config[key] = value;
        } else {
            configTraverse(config[key], value);
        }
    });
}

module.exports = function (environment) {
    var config = configs[environment] || configs[Object.keys(configs)[0]];

    var keys = Object.keys(config);
    var i = 0;
    var len = keys.length;
    while (i < len) {
        var key = keys[i];
        config[key] = config[key];
        i++;
    }

    config.sessionKeyPrefix = 'fc:session-v11:';
    config.env = environment;
    config.ip = 'localhost';

    var clientVersion = '{"Version":  "1.0.0.0"}';
    var launcherVersion = '{"Version":  "1.0.0.0"}';

        var localConfig = false;
        try {
            localConfig = require('./local');
        } catch (err) {
            // Ignore
        }

        if (localConfig) {
            configTraverse(config, localConfig);
        }

    module.exports = config;
    return config;
};