const chalk = require('chalk');

function logger(req, res, next) {
    console.log(chalk.grey(req.method, req.originalUrl));
    next();
}

module.exports = logger;
