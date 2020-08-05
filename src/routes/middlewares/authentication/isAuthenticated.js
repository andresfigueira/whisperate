const TokenCookieName = require('../../../session/value-objects/TokenCookieName');
const Unauthorized = require('../../../../core/errors/Unauthorized');
const SessionTokenModel = require('../../../session-token/SessionTokenModel');

async function isAuthenticated(req, res, next) {
    try {
        const tokenCookieName = TokenCookieName();
        const token = req.cookies[tokenCookieName];
        if (!token) {
            throw new Unauthorized();
        }

        const sessionToken = await SessionTokenModel.findOne({ token }).exec();
        if (!sessionToken) {
            throw new Unauthorized();
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = isAuthenticated;
