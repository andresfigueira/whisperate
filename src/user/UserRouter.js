const express = require('express');
const UserController = require('./UserController');

const router = express.Router();

function UserRouter(app) {
    app.use('', router);
    router.post('/v1/users', UserController.create);
    router.post('/v1/login', UserController.login);
}

module.exports = UserRouter;
