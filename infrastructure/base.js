const heroin = require('heroin-js');

const configurator = heroin(process.env.HEROKU_API_TOKEN);

//configurator.export('drobny-inventory').then(resultConfig => {
//    console.log(resultConfig);
//});

module.exports = {
    name: 'base-name',
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars: {
    },
    addons: {
        mongolab: {
            plan: 'mongolab:sandbox'
        }
    },
    collaborators: [
        'michdrob@gmail.com',
        'jacek.zyla@schibsted.pl'
    ],
    features: {
        'runtime-dyno-metadata': { enabled: false },
        'log-runtime-metrics': { enabled: false },
        'http-session-affinity': { enabled: false },
        preboot: { enabled: false },
        'http-shard-header': { enabled: false },
        'http-end-to-end-continue': { enabled: false }
    },
    formation: [ { process: 'web', quantity: 1, size: 'Free' } ],
    log_drains: ['syslog://data.logentries.com:13636'],
    domains: []
};