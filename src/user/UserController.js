const UserController = {
    login: (req, res) => {
        console.log(req.method);
        res.send('Test');
    }
}

exports.default = UserController;
