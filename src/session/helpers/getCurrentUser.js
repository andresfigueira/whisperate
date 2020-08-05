const TokenCookieName = require('../value-objects/TokenCookieName');
const EncrypterService = require('../../shared/services/encrypter/EncrypterService');
const InternalServerError = require('../../../core/errors/InternalServerError');

function getCurrentUser(req) {
    const tokenCookieName = TokenCookieName();
    const token = req.cookies[tokenCookieName];
    const userString = EncrypterService.decrypt(token);

    if (!userString) {
        throw new InternalServerError('Cannot reach user');
    }

    return JSON.parse(userString);
}

module.exports = getCurrentUser;
