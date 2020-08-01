const CipherService = require('../../shared/services/cipher/CipherService');

class SessionHandlerService {
    constructor(user, res) {
        this.user = user;
        this.res = res;
    }

    start() {
        return new Promise((resolve, reject) => {
            const oneWeekInSeconds = 7 * 24 * 60 * 60;
            CipherService.encrypt(JSON.stringify(this.user)).then((encryptedUser) => {
                this.res.cookie('whisperate-session', encryptedUser, {
                    maxAge: oneWeekInSeconds,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                });

                resolve(this.user);
            }).catch(() => {
                reject(new Error('Encryption error'));
            });
        });
    }
}

module.exports = SessionHandlerService;
