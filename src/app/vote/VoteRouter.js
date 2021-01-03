const express = require('express');
const VoteController = require('./VoteController');
const permit = require('../../routes/middlewares/authorization/permit.middleware');

const router = express.Router();

function VoteRouter(app) {
    app.use('/v1', router);
    router.post('/whispers/:id/vote', permit('user'), VoteController.vote);
}

module.exports = VoteRouter;
