const express = require('express');
const UserController = require('./UserController');
const permit = require('../../routes/middlewares/authorization/permit.middleware');
const isAuthenticated = require('../../routes/middlewares/authentication/isAuthenticated');

const router = express.Router();

function UserRouter(app) {
    app.use('/v1', router);
    router.post('/users', UserController.create);
    router.patch('/users', permit('superadmin'), UserController.update);
    router.post('/login', UserController.login);
    router.delete('/logout', isAuthenticated, UserController.logout);
}

module.exports = UserRouter;
