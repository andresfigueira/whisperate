const NotFound = require('../../../../core/errors/NotFound');

function errorHandler(app) {
    app.use((err, req, res, next) => {
        if (err) {
            const response = {
                status: err.status || 500,
                message: err.status ? err.message : 'Internal server error',
            };

            if (process.env.NODE_ENV !== 'production') {
                response.stack = err.stack;
            }
            res.status(err.status || 500).json(response);
        }
        next();
    });
    app.use((req, res) => {
        const response = {
            status: 404,
            message: 'Page not found',
        };
        res.status(404).json(response);
    });
}

module.exports = errorHandler;
