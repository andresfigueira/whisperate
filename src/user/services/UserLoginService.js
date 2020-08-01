const UserModel = require('../UserModel');
const CipherService = require('../../shared/services/cipher/CipherService');
const CustomError = require('../../../core/errors/CustomError');

class UserLoginService {
    constructor(identifier, password) {
        this.identifier = identifier;
        this.password = password;
    }

    login() {
        return new Promise(async (resolve, reject) => {
            const user = await UserModel.findOne({ email: this.identifier }).exec();
            if (!user) {
                reject(new CustomError('User not found', 404));
                return;
            }

            const match = await CipherService.compare(this.password, user.password);
            if (!match) {
                reject(new CustomError('Invalid credentials', 401));
                return;
            }

            resolve(user);
        });
    }
}

module.exports = UserLoginService;
