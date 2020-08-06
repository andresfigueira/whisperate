const express = require('express');
const UserController = require('./UserController');
const permit = require('../../routes/middlewares/authorization/permit.middleware');
const isAuthenticated = require('../../routes/middlewares/authentication/isAuthenticated');

const router = express.Router();

function UserRouter(app) {
    app.use('', router);
    router.post('/v1/users', UserController.create);
    router.patch('/v1/users', permit('superadmin'), UserController.update);
    router.post('/v1/login', UserController.login);
    router.delete('/v1/logout', isAuthenticated, UserController.logout);
}

module.exports = UserRouter;
