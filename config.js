'use strict';

module.exports = {
    PORT: process.env.PORT || 8080,
    MONGOLAB_URI: process.env.MONGOLAB_URI || 'mongodb://192.168.99.100:27017/booksStorage'
};
