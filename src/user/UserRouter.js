const UserController = require('./UserController');
const express = require('express');
const router = express.Router();

function middle(req, res, next) {
    console.log('Time:', Date.now());
    next();
}

function UserRouter(app) {
    app.use('', router);
    router.post('/v1/sign-up', UserController.signUp);
    router.post('/v1/login', UserController.login);
}

module.exports = UserRouter;
