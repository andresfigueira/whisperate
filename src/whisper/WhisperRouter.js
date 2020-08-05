const express = require('express');
const WhisperController = require('./WhisperController');
const permit = require('../routes/middlewares/authorization/permit.middleware');

const router = express.Router();

function WhisperRouter(app) {
    app.use('', router);
    router.post('/v1/whispers', permit('user'), WhisperController.create);
    router.delete('/v1/whispers/:id', permit('user'), WhisperController.delete);
    router.get('/v1/whispers/:id', permit('user'), WhisperController.id);
    router.get('/v1/whispers', permit('user'), WhisperController.all);
}

module.exports = WhisperRouter;
