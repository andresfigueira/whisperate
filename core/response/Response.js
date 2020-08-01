class Response {
    static error(message = '', error = undefined) {
        const response = {
            message,
        };

        if (error) { response.error = error; }

        return response;
    }
}

module.exports = Response;
