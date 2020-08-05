const bcrypt = require('bcrypt');

class SuperEncrypterService {
    static encrypt(data, saltRounds = 10) {
        return new Promise((resolve, reject) => bcrypt.hash(data, saltRounds)
            .then(resolve)
            .catch(reject));
    }

    static compare(data, hash) {
        return new Promise((resolve, reject) => bcrypt.compare(data, hash)
            .then(resolve)
            .catch(reject));
    }
}

module.exports = SuperEncrypterService;
