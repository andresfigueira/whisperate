const BaseError = require('./BaseError');

class BadRequest extends BaseError {
    constructor(message = 'Bad request') {
        super();
        this.status = 400;
        this.message = message;
    }
}

module.exports = BadRequest;
