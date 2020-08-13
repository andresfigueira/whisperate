const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const JSONBodyRequired = require('./json/JSONBodyRequired.middleware');
const JSONFormat = require('./json/JSONFormat.middleware');
const URLEncodedFormat = require('./urlencoded/URLEncodedFormat.middleware');
const logger = require('./logger/logger.middleware');

function middlewares(app) {
    app.use(cors());
    app.use(logger);

    app.use(cookieParser());

    app.use(express.json());
    app.use(JSONFormat);
    app.use(JSONBodyRequired);

    // app.use(express.urlencoded({ extended: true }));
    // app.use(URLEncodedFormat);
}

module.exports = middlewares;
