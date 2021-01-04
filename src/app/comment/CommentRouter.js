const express = require('express');
const CommentController = require('./CommentController');
const permit = require('../../routes/middlewares/authorization/permit.middleware');

const router = express.Router();

function CommentRouter(app) {
    app.use('/v1', router);
    router.get('/whispers/:whisperId/comments', /* permit('user'), */ CommentController.all);
    router.post('/whispers/:whisperId/comments', /* permit('user'), */ CommentController.comment);
    router.delete('/whispers/:whisperId/comments/:id', /* permit('user'), */ CommentController.delete);
}

module.exports = CommentRouter;
