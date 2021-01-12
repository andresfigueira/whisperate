const chalk = require('chalk');
const BadRequest = require('../../../../core/errors/BadRequest');

function JSONFormat(err, req, res, next) {
    if (err) {
        console.log(chalk.bgRed('   Error JSON   '));
        console.log(chalk.red(JSON.stringify(err, null, 2)));
        throw new BadRequest('JSON format');
    }

    next();
}

module.exports = JSONFormat;
