function errorMiddleware(err, req, res, next) {
    if (err) {
        res.status(err.status || 500).json({
            status: err.status || 500,
            message: err.status ? err.message : 'Internal server error',
        });
    }
    next();
}

module.exports = errorMiddleware;
