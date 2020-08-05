const BaseError = require('./BaseError');

class Forbidden extends BaseError {
    constructor(message = 'You do not have access to this resource') {
        super();
        this.status = 403;
        this.message = message;
        this.date = new Date();
    }
}

module.exports = Forbidden;
