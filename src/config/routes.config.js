const { default: UserController } = require('../user/UserController');
const express = require('express');
const router = express.Router();

class Router {
    constructor(app) {
        this.app = app;
    }

    init() {
        this.app.use('', router);
        this.setRoutes();
    }

    setRoutes() {
        router.get('/login', UserController.login);
    }
}

exports.default = Router;
