const TokenCookieName = require('../../../session/value-objects/TokenCookieName');
const BaseError = require('../../../../core/errors/BaseError');
const SessionTokenModel = require('../../../session-token/SessionTokenModel');

async function isAuthenticated(req, res, next) {
    const tokenCookieName = TokenCookieName();
    const token = req.cookies[tokenCookieName];
    if (!token) {
        throw new BaseError(401, 'User is not authenticated');
    }

    const sessionToken = await SessionTokenModel.findOne({ token }).exec();
    if (!sessionToken) {
        throw new BaseError(401, 'User is not authenticated');
    }

    next();
}

module.exports = isAuthenticated;
