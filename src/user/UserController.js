const UserCreateService = require('./services/UserCreateService');
const UserId = require('./value-objects/UserId');
const UserLoginService = require('./services/UserLoginService');
const SessionHandlerService = require('../session/services/SessionHandlerService');
const Assert = require('../shared/services/assert/Assert');
const BaseError = require('../../core/errors/BaseError');
const Response = require('../../core/response/Response');

const UserController = {
    create: async (req, res, next) => {
        try {
            const {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                birthday,
                country,
            } = req.body;
            const id = UserId();
            const user = new UserCreateService(
                id,
                firstName,
                lastName,
                email,
                password,
                birthday,
                country,
            );

            const response = await user.save();
            if (!response) {
                throw new BaseError(400, 'Error saving user');
            }

            res.status(201).send(response);
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const assert = new Assert(req.body, {
                identifier: {
                    required: true,
                },
                password: {
                    required: true,
                },
            });

            if (!assert.isValid()) {
                throw new BaseError(400, Response.error(assert.invalidMessage, assert.errors));
            }

            const { identifier, password } = req.body;
            const user = new UserLoginService(identifier, password);

            const response = await user.login();
            if (!response) {
                throw new BaseError(400, 'Error logging in');
            }

            const session = new SessionHandlerService(user, res);
            await session.start();

            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res, next) => {
        try {
            const session = new SessionHandlerService(null, res);
            await session.destroy();
            return res.status(200).send();
        } catch (error) {
            next(error);
        }
    },
};

module.exports = UserController;
