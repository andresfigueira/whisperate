const express = require('express');
const VoteController = require('./VoteController');
const permit = require('../../routes/middlewares/authorization/permit.middleware');

const router = express.Router();

function VoteRouter(app) {
    app.use('', router);
    router.post('/v1/whispers/:id/vote', permit('user'), VoteController.vote);
}

module.exports = VoteRouter;
