'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const config = require('./config');
const app = express();
const url = config.MONGOLAB_URI;

let stockRepo = null;
if (process.env.NODE_ENV === 'testing') {
    stockRepo = require('./stock-memory-repo')();
} else {
    const connection = MongoClient.connect(url);
    stockRepo = require('./stock-repo')(connection);
}

const routes = require('./routes')(stockRepo);

app.use(bodyParser.json());

app.get('/stock', routes.stock.getAll);
app.get('/stock/:isbn', routes.stock.get);
app.post('/stock', routes.stock.post);

app.use(routes.errors.notFound);
app.use(routes.errors.internal);

module.exports = app;
