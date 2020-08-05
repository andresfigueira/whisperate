const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const JSONBodyRequiredMiddleware = require('./json/JSONBodyRequired.middleware');
const JSONFormatMiddleware = require('./json/JSONFormat.middleware');
const URLEncodedFormatMiddleware = require('./urlencoded/URLEncodedFormat.middleware');
const loggerMiddleware = require('./logger/logger.middleware');

function middlewares(app) {
    app.use(cors());
    app.use(loggerMiddleware);

    app.use(cookieParser());

    app.use(express.json());
    app.use(JSONFormatMiddleware);
    app.use(JSONBodyRequiredMiddleware);

    app.use(express.urlencoded({ extended: true }));
    app.use(URLEncodedFormatMiddleware);
}

module.exports = middlewares;
