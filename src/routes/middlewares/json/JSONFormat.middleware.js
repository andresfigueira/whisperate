const chalk = require('chalk');

function JSONFormatMiddleware(err, req, res, next) {
    if (err) {
        console.log(chalk.bgRed('   Error JSON   '));
        console.log(chalk.red(JSON.stringify(err, null, 2)));
        res.status(400).send(Response.error('JSON format', err));
        return;
    }

    next();
}

module.exports = JSONFormatMiddleware;
