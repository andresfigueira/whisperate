const UserModel = require('../UserModel');
const CipherService = require('../../shared/services/cipher/CipherService');

class UserLoginService {
    constructor(identifier, password) {
        this.identifier = identifier;
        this.password = password;
    }

    login() {
        return new Promise(async (resolve, reject) => {
            const user = await UserModel.findOne({ email: this.identifier }).exec();
            if (!user) { reject(new Error('User not found')); }

            const match = await CipherService.compare(this.password, user.password);
            if (!match) { reject(new Error('Invalid credentials')); }

            resolve(user);
        });
    }
}

module.exports = UserLoginService;
