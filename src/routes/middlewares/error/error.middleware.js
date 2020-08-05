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
}

module.exports = errorHandler;
