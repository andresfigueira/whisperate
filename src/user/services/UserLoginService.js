const UserModel = require('../UserModel');
const SuperEncrypterService = require('../../shared/services/super-encrypter/SuperEncrypterService');
const NotFound = require('../../../core/errors/NotFound');
const Unauthorized = require('../../../core/errors/Unauthorized');

class UserLoginService {
    constructor(identifier, password) {
        this.identifier = identifier;
        this.password = password;
    }

    async login() {
        const user = await UserModel.findOne({ email: this.identifier }).exec();
        if (!user) {
            throw new NotFound();
        }

        const match = await SuperEncrypterService.compare(this.password, user.password);
        if (!match) {
            throw new Unauthorized('Invalid credentials');
        }

        return user;
    }
}

module.exports = UserLoginService;
