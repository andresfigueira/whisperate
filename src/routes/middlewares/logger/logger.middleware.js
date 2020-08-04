const chalk = require('chalk');

function loggerMiddleware(req, res, next) {
    console.log(chalk.grey(req.method, req.originalUrl));
    next();
}

module.exports = loggerMiddleware;
