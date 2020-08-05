const BaseError = require('./BaseError');

class Conflict extends BaseError {
    constructor(message) {
        super();
        this.status = 409;
        this.message = message;
    }
}

module.exports = Conflict;
