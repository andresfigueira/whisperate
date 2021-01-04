const express = require('express');
const TagController = require('./TagController');
const permit = require('../../routes/middlewares/authorization/permit.middleware');

const router = express.Router();

function TagRouter(app) {
    app.use('/v1', router);
    router.get('/tags/:name', /* permit('user'), */ TagController.all);
    router.post('/tags', /* permit('user'), */ TagController.comment);
    router.delete('/tags/:id', /* permit('user'), */ TagController.delete);
}

module.exports = TagRouter;
