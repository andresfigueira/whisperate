const { default: UserSignUpService } = require("./services/UserSignUpService");
const { default: UserId } = require("./value-objects/UserId");
const { default: UserLoginService } = require("./services/UserLoginService");

const UserController = {
    signUp: (req, res) => {
        if (!req.body) {
            return res.status(400).send({
                error: true,
                message: "Request must have body"
            });
        }

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
            res.status(400).send(error);
        });
    },
    login: (req, res) => {
        if (!req.body) {
            return res.status(400).send({
                error: true,
                message: "Request must have body"
            });
        }

        if (!req.body.identifier || !req.body.password) {
            return res.status(400).send({
                error: true,
                message: "Email and password required"
            });
        }

        const { identifier, password } = req.body;
        const user = new UserLoginService(identifier, password);

        user.login().then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(401).send(error);
        });
    }
}

exports.default = UserController;
