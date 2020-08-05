const TokenCookieName = require('../value-objects/TokenCookieName');
const Duration = require('../value-objects/Duration');
const EncrypterService = require('../../shared/services/encrypter/EncrypterService');

class SessionHandlerService {
    constructor(res, user = null) {
        this.res = res;
        this.user = JSON.stringify(user);
        this.tokenCookieValue = null;
        this.tokenCookieName = TokenCookieName();
        this.duration = Duration();
    }

    async start() {
        this.tokenCookieValue = await EncrypterService.encrypt(this.user);
        this.res.cookie(this.tokenCookieName, this.tokenCookieValue, {
            maxAge: this.duration,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
    }

    getCookie() {
        return this.tokenCookieValue;
    }

    destroy() {
        return this.res.clearCookie(this.tokenCookieName);
    }
}

module.exports = SessionHandlerService;
