const EncrypterService = require('../../shared/services/encrypter/EncrypterService');
const InternalServerError = require('../../../core/errors/InternalServerError');
const { tokenSessionName } = require('../constants');

function getCurrentUser(req) {
    const token = req.cookies[tokenSessionName];
    const userString = EncrypterService.decrypt(token);

    if (!userString) {
        throw new InternalServerError('Cannot reach user');
    }

    return JSON.parse(userString);
}

module.exports = getCurrentUser;
