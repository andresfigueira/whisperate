const BaseError = require('./BaseError');

class Unauthorized extends BaseError {
    constructor(message = 'User not authenticated') {
        super();
        this.status = 401;
        this.message = message;
    }
}

module.exports = Unauthorized;
