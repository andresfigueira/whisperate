class Response {
    static error(message = 'Error', error = undefined) {
        let response = {
            message,
        };

        if (error)
            response.error = error;

        return response;
    }
}

module.exports = Response;
