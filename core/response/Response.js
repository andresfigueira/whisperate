class Response {
    static error(message = '', error = undefined) {
        const response = {
            message: `Error: ${message}`,
        };

        if (error) { response.error = error; }

        return response;
    }
}

module.exports = Response;
