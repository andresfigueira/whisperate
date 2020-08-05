const BaseError = require('./BaseError');

class InternalServerError extends BaseError {
    constructor(message = 'Internal server error') {
        super();
        this.status = 500;
        this.message = message;
    }
}

module.exports = InternalServerError;
