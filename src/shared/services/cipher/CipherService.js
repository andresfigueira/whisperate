class CipherService {
    encrypt(data, saltRounds = 10) {
        return new Promise((resolve, reject) => {
            const bcrypt = require('bcrypt');

            return bcrypt.hash(data, saltRounds)
                .then(resolve)
                .catch(reject);
        });
    }

    compare(data, hash) {
        return new Promise((resolve, reject) => {
            const bcrypt = require('bcrypt');

            return bcrypt.compare(data, hash)
                .then(resolve)
                .catch(reject);
        });
    }
}

module.exports = CipherService;
