class PasswordCryptService {
    encrypt(password, saltRounds = 10) {
        return new Promise((resolve, reject) => {
            const bcrypt = require('bcrypt');

            return bcrypt.hash(password, saltRounds)
                .then(resolve)
                .catch(reject);
        });
    }

    compare(password, hash) {
        return new Promise((resolve, reject) => {
            const bcrypt = require('bcrypt');

            return bcrypt.compare(password, hash)
                .then(resolve)
                .catch(reject);
        });
    }
}

module.exports = PasswordCryptService;
