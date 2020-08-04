class BaseError extends Error {
    constructor(status = 500, message) {
        super();
        this.status = status;
        this.message = message;
        this.date = new Date();
    }
}

module.exports = BaseError;
