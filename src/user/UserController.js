const UserSignUpService = require("./services/UserSignUpService");
const UserId = require("./value-objects/UserId");
const UserLoginService = require("./services/UserLoginService");
const SessionHandlerService = require("../session/services/SessionHandlerService");
const app = require("../app");
const Response = require("../../core/response/Response");

const UserController = {
    signUp: (req, res) => {
        const {
            first_name,
            last_name,
            email,
            password,
            birthday,
            country,
        } = req.body;
        const id = UserId();

        const user = new UserSignUpService(
            id,
            first_name,
            last_name,
            email,
            password,
            birthday,
            country
        );

        user.save().then(response => {
            res.status(201).send(response);
        }).catch(error => {
            res.status(400).send(Response.error('Error', error));
        });
    },
    login: (req, res) => {
        if (!req.body) {
            return res.status(400).send(Response.error('Request must have body'));
        }

        if (!req.body.identifier || !req.body.password) {
            return res.status(400).send(Response.error('Email and password required'));
        }

        const { identifier, password } = req.body;
        const user = new UserLoginService(identifier, password);

        user.login().then(async response => {
            const session = new SessionHandlerService(user, res);
            await session.start();

            res.status(200).send(response);
        }).catch(error => {
            res.status(401).send(Response.error('Error', error));
        });
    }
}

module.exports = UserController;
