const { default: UserController } = require('./UserController');
const express = require('express');
const router = express.Router();

function UserRouter(app) {
    app.use('', router);

    router.post('/v1/sign-up', UserController.signUp);
    router.post('/v1/login', UserController.login);
}

exports.default = UserRouter;
