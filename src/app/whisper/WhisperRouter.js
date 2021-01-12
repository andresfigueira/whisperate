const express = require('express');
const WhisperController = require('./WhisperController');
const permit = require('../../routes/middlewares/authorization/permit.middleware');

const router = express.Router();

function WhisperRouter(app) {
    app.use('/v1/whispers', router);
    router.post('/', /* permit('user'), */ WhisperController.create);
    router.delete('/:id', /* permit('user'), */ WhisperController.delete);
    router.get('/:id', /* permit('user'), */ WhisperController.id);
    router.get('/', /* permit('user'), */ WhisperController.all);
}

module.exports = WhisperRouter;
