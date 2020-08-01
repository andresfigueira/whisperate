const UserModel = require("../UserModel");
const PasswordCryptService = require("./PasswordCryptService");

class UserLoginService {
    constructor(identifier, password) {
        this.identifier = identifier;
        this.password = password;
    }

    login() {
        return new Promise(async (resolve, reject) => {
            const user = await UserModel.findOne({ email: this.identifier }).exec();

            if (!user)
                reject(null);

            const crypter = new PasswordCryptService();
            const match = await crypter.compare(this.password, user.password);

            if (!match)
                reject(null);

            resolve(user);
        });
    }
}

module.exports = UserLoginService;
