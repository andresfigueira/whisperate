const chalk = require('chalk');
const BadRequest = require('../../../../core/errors/BadRequest');

function URLEncodedFormat(err, req, res, next) {
    if (err) {
        console.log(chalk.bgRed('   Error URL encoded   '));
        console.log(chalk.red(JSON.stringify(err, null, 2)));
        throw new BadRequest('URL encoded format');
    }
    next();
}

module.exports = URLEncodedFormat;
