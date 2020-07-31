const { default: UserController } = require('./UserController');
const express = require('express');
const router = express.Router();

function UserRouter(app) {
    app.use('', router);

    router.post('/sign-up', UserController.signUp);
}

exports.default = UserRouter;
