const CipherService = require("../../shared/services/cipher/CipherService");

class SessionHandlerService {
    constructor(user, res) {
        this.user = user;
        this.res = res;
    }

    start() {
        return new Promise(async (resolve, reject) => {
            const oneWeekInSeconds = 7 * 24 * 60 * 60;
            const cipher = new CipherService();
            const encryptedUser = await cipher.encrypt(JSON.stringify(this.user));

            this.res.cookie('whisperate-session', encryptedUser, {
                maxAge: oneWeekInSeconds,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            });

            resolve(this.user);
        });
    }
}

module.exports = SessionHandlerService;
