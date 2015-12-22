const heroin = require('heroin-js');

const infrastructureBaseConfig = require('./base');

const configurator = heroin(process.env.HEROKU_API_TOKEN);

const config = Object.assign({}, infrastructureBaseConfig, {
    name: 'drobny-inventory-test',
    domains: [ 'drobny-inventory-test.herokuapp.com' ]
});

configurator(config);