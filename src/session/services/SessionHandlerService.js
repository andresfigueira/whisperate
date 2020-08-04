const CipherService = require('../../shared/services/cipher/CipherService');

class SessionHandlerService {
    constructor(user, res) {
        this.user = user;
        this.res = res;
        this.cookieName = 'whisperate-session';
    }

    async start() {
        const oneWeekInSeconds = 7 * 24 * 60 * 60;
        const encryptedUser = await CipherService.encrypt(JSON.stringify(this.user));

        this.res.cookie(this.cookieName, encryptedUser, {
            maxAge: oneWeekInSeconds,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });

        return this.user;
    }

    destroy() {
        return this.res.clearCookie(this.cookieName);
    }
}

module.exports = SessionHandlerService;
