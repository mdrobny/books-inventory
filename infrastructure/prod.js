const heroin = require('heroin-js');

const infrastructureBaseConfig = require('./base');

const configurator = heroin(process.env.HEROKU_API_TOKEN);

const config = Object.assign({}, infrastructureBaseConfig, {
    name: 'drobny-inventory',
    domains: [ 'drobny-inventory.herokuapp.com' ]
});

configurator(config);
