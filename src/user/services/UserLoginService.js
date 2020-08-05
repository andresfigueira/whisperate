const UserModel = require('../UserModel');
const SuperEncrypterService = require('../../shared/services/super-encrypter/SuperEncrypterService');
const BaseError = require('../../../core/errors/BaseError');

class UserLoginService {
    constructor(identifier, password) {
        this.identifier = identifier;
        this.password = password;
    }

    async login() {
        const user = await UserModel.findOne({ email: this.identifier }).exec();
        if (!user) {
            throw new BaseError(404, 'User not found');
        }

        const match = await SuperEncrypterService.compare(this.password, user.password);
        if (!match) {
            throw new BaseError(401, 'Invalid credentials');
        }

        return user;
    }
}

module.exports = UserLoginService;
