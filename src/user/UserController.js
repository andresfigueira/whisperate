const { default: UserModel } = require("./UserModel");

const UserController = {
    signUp: (req, res) => {
        const user = new UserModel({
            first_name: 'Andres',
            last_name: 'Figueira',
            email: 'Figueira',
        });

        user.save().then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    }
}

exports.default = UserController;
