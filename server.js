'use strict';

const config = require('./config');
const app = require('./app');

const server = app.listen(config.PORT, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
