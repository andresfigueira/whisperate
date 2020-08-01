const express = require('express');
const UserController = require('./UserController');

const router = express.Router();

function UserRouter(app) {
    app.use('', router);
    router.post('/v1/sign-up', UserController.signUp);
    router.post('/v1/login', UserController.login);
}

module.exports = UserRouter;
