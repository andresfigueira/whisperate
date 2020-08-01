const CipherService = require('../../shared/services/cipher/CipherService');

class SessionHandlerService {
    constructor(user, res) {
        this.user = user;
        this.res = res;
    }

    start() {
        return new Promise((resolve, reject) => {
            const oneWeekInSeconds = 7 * 24 * 60 * 60;
            const cipher = new CipherService();
            cipher.encrypt(JSON.stringify(this.user)).then((encryptedUser) => {
                this.res.cookie('whisperate-session', encryptedUser, {
                    maxAge: oneWeekInSeconds,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                });

                resolve(this.user);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = SessionHandlerService;
