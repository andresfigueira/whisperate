const Unauthorized = require('../../../../core/errors/Unauthorized');
const SessionTokenModel = require('../../../app/session-token/SessionTokenModel');
const { tokenSessionName } = require('../../../session/constants');

async function isAuthenticated(req, res, next) {
    try {
        const token = req.cookies[tokenSessionName];
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
