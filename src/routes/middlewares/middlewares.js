const express = require('express');
const JSONBodyRequiredMiddleware = require('./json/JSONBodyRequired.middleware');
const JSONFormatMiddleware = require('./json/JSONFormat.middleware');
const URLEncodedFormatMiddleware = require('./urlencoded/URLEncodedFormat.middleware');

function middlewares(app) {
    app.use(express.json());
    app.use(JSONFormatMiddleware);
    app.use(JSONBodyRequiredMiddleware);

    app.use(express.urlencoded({ extended: true }));
    app.use(URLEncodedFormatMiddleware);
}

module.exports = middlewares;
