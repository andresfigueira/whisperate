const SessionTokenModel = require('../SessionTokenModel');
const BaseError = require('../../../core/errors/BaseError');

class SessionTokenCreateService {
    constructor(
        id,
        token,
        userId,
    ) {
        this.id = id;
        this.token = token;
        this.userId = userId;
    }

    async save() {
        const sessionToken = new SessionTokenModel({
            _id: this.id,
            token: this.token,
            user: this.userId,
        });

        const response = await sessionToken.save();
        return response;
    }
}

module.exports = SessionTokenCreateService;
