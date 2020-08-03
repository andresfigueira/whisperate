const chalk = require('chalk');
const Response = require('../../../../core/response/Response');

function URLEncodedFormatMiddleware(err, req, res, next) {
    if (err) {
        console.log(chalk.bgRed('   Error URL encoded   '));
        console.log(chalk.red(JSON.stringify(err, null, 2)));
        res.status(400).send(Response.error('Error: URL encoded format', err));
        return;
    }
    next();
}

module.exports = URLEncodedFormatMiddleware;
