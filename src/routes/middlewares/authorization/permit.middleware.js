const TokenCookieName = require('../../../session/value-objects/TokenCookieName');
const isAuthenticated = require('../authentication/is-authenticated.middleware');
const EncrypterService = require('../../../shared/services/encrypter/EncrypterService');
const BaseError = require('../../../../core/errors/BaseError');

function permit(...allowed) {
    const isAllowed = (role) => allowed.indexOf(role) > -1;

    return (req, res, next) => {
        try {
            isAuthenticated(req, res, next);
            const tokenCookieName = TokenCookieName();
            const token = req.cookies[tokenCookieName];
            const userString = EncrypterService.decrypt(token);

            if (!userString) {
                throw new BaseError(500, 'Cannot reach user');
            }

            const { role } = JSON.parse(userString);
            if (!role || !isAllowed(role)) {
                console.log('notallowed', role, allowed);
                throw new BaseError(403, 'User does not have access');
            }
        } catch (error) {
            next(error);
        }
    };
}

module.exports = permit;
