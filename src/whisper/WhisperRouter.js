const express = require('express');
const WhisperController = require('./WhisperController');

const router = express.Router();

function WhisperRouter(app) {
    app.use('', router);
    router.post('/v1/whispers', WhisperController.create);
}

module.exports = WhisperRouter;
