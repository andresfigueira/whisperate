const BaseError = require('./BaseError');

class NotFound extends BaseError {
    constructor(message = 'Not found') {
        super();
        this.status = 404;
        this.message = message;
    }
}

module.exports = NotFound;
