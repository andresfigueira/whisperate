const UserCreateService = require('./services/UserCreateService');
const UserLoginService = require('./services/UserLoginService');
const SessionHandlerService = require('../../session/services/SessionHandlerService');
const Assert = require('../../shared/services/assert/Assert');
const Response = require('../../../core/response/Response');
const UserUpdateService = require('./services/UserUpdateService');
const SessionTokenCreateService = require('../session-token/services/SessionTokenCreateService');
const BadRequest = require('../../../core/errors/BadRequest');
const InternalServerError = require('../../../core/errors/InternalServerError');
const UserModel = require('./UserModel');
const NotFound = require('../../../core/errors/NotFound');
const { getObjectId } = require('../../shared/services/entity/Entity.helper');

const UserController = {
    create: async (req, res, next) => {
        try {
            const assert = new Assert(req.body, {
                first_name: { required: true },
                last_name: { required: true },
                username: { required: true },
                email: { required: true },
                password: { required: true },
                birthday: { required: true },
            });
            if (!assert.isValid()) {
                throw new BadRequest(Response.error(assert.invalidMessage, assert.errors));
            }

            const id = getObjectId();
            const user = new UserCreateService(
                id,
                req.body.first_name,
                req.body.last_name,
                req.body.username,
                req.body.email,
                req.body.password,
                req.body.birthday,
                req.body.country,
            );

            const response = await user.save();
            if (!response) { throw new BadRequest('Error saving user'); }

            res.status(201).send(response);
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const assert = new Assert(req.body, {
                identifier: { required: true },
                password: { required: true },
            });
            if (!assert.isValid()) {
                throw new BadRequest(Response.error(assert.invalidMessage, assert.errors));
            }

            const { identifier, password } = req.body;
            const userLoginService = new UserLoginService(identifier, password);
            const user = await userLoginService.login();
            if (!user) { throw new InternalServerError('Cannot log in'); }

            const session = new SessionHandlerService(res, user);
            await session.start();
            const token = session.getCookie();
            const sessionTokenCreateService = new SessionTokenCreateService(
                getObjectId(),
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
            const assert = new Assert(req.params, {
                id: { required: true },
            });
            if (!assert.isValid()) {
                throw new BadRequest(Response.error(assert.invalidMessage, assert.errors));
            }

            const { id } = req.params;
            const user = await UserModel.findOne({ _id: id }).exec();
            if (!user) { throw new NotFound(); }

            const updateService = new UserUpdateService(id, req.body);
            const userUpdated = await updateService.save();

            res.status(200).send(userUpdated);
        } catch (error) {
            next(error);
        }
    },
};

module.exports = UserController;
