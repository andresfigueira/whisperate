const UserSignUpService = require('./services/UserSignUpService');
const UserId = require('./value-objects/UserId');
const UserLoginService = require('./services/UserLoginService');
const SessionHandlerService = require('../session/services/SessionHandlerService');
const Response = require('../../core/response/Response');
const Assert = require('../shared/services/assert/Assert');

const UserController = {
    signUp: (req, res) => {
        const {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            birthday,
            country,
        } = req.body;
        const id = UserId();

        const user = new UserSignUpService(
            id,
            firstName,
            lastName,
            email,
            password,
            birthday,
            country,
        );

        user.save().then((response) => {
            res.status(201).send(response);
        }).catch((error) => {
            res.status(400).send(Response.error('Error', error));
        });
    },
    login: (req, res) => {
        const assert = new Assert(req.body, {
            identifier: {
                required: true,
                pattern: /.d+/,
                patternMessage: 'Nooo',
            },
            password: {
                required: true,
            },
        });

        if (!assert.isValid()) {
            return res.status(400).send(Response.error(assert.invalidMessage, assert.errors));
        }

        const { identifier, password } = req.body;
        const user = new UserLoginService(identifier, password);

        user.login().then(async (response) => {
            const session = new SessionHandlerService(user, res);
            await session.start();

            res.status(200).send(response);
        }).catch((error) => {
            res.status(error.status || 500).send(Response.error(error.message));
        });

        return true;
    },
};

module.exports = UserController;
