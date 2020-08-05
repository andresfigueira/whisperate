const UserCreateService = require('./services/UserCreateService');
const UserId = require('./value-objects/UserId');
const UserLoginService = require('./services/UserLoginService');
const SessionHandlerService = require('../session/services/SessionHandlerService');
const Assert = require('../shared/services/assert/Assert');
const BaseError = require('../../core/errors/BaseError');
const Response = require('../../core/response/Response');
const UserUpdateService = require('./services/UserUpdateService');
const SessionTokenCreateService = require('../session-token/services/SessionTokenCreateService');
const SessionTokenId = require('../session-token/value-objects/SessionTokenId');

const UserController = {
    create: async (req, res, next) => {
        try {
            const assert = new Assert(req.body, {
                first_name: {
                    required: true,
                },
                last_name: {
                    required: true,
                },
                email: {
                    required: true,
                },
                password: {
                    required: true,
                },
                birthday: {
                    required: true,
                },
            });

            if (!assert.isValid()) {
                throw new BaseError(400, Response.error(assert.invalidMessage, assert.errors));
            }

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
            const userLoginService = new UserLoginService(identifier, password);
            const user = await userLoginService.login();
            if (!user) {
                throw new BaseError(500, 'Cannot log in');
            }

            const session = new SessionHandlerService(res, user);
            await session.start();

            const token = session.getCookie();
            const sessionTokenCreateService = new SessionTokenCreateService(
                SessionTokenId(),
                token,
                user._id,
            );
            await sessionTokenCreateService.save();

            res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res, next) => {
        try {
            const session = new SessionHandlerService(res);
            await session.destroy();

            res.status(200).send();
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const assert = new Assert(req.body, {
                id: {
                    required: true,
                },
            });
            if (!assert.isValid()) {
                throw new BaseError(400, Response.error(assert.invalidMessage, assert.errors));
            }

            const { id, ...values } = req.body;
            const user = new UserUpdateService(id, values);
            const userUpdated = await user.save();

            res.status(200).send(userUpdated);
        } catch (error) {
            next(error);
        }
    },
};

module.exports = UserController;
