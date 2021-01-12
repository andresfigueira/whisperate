const express = require('express');
const cookieParser = require('cookie-parser');
const JSONBodyRequired = require('./json/JSONBodyRequired.middleware');
const JSONFormat = require('./json/JSONFormat.middleware');
const logger = require('./logger/logger.middleware');
const corsHandler = require('./cors/cors.middleware');

function middlewares(app) {
    corsHandler(app);
    app.use(logger);
    app.use(cookieParser());

    app.use(express.json());
    app.use(JSONFormat);
    app.use(JSONBodyRequired);

    // app.use(express.urlencoded({ extended: true }));
    // app.use(URLEncodedFormat);
}

module.exports = middlewares;
