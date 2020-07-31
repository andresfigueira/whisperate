const { default: UserModel } = require("./UserModel");

const UserController = {
    signUp: (req, res) => {
        console.log('body', req.body);
        const user = new UserModel({
            first_name: 'Andres',
            last_name: 'Figueira',
            email: 'Figueira',
        });

        user.save().then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400)
                .send(error);
        })
    }
}

exports.default = UserController;
