const chalk = require('chalk');
const Response = require('../../../../core/response/Response');

function JSONFormat(err, req, res, next) {
    if (err) {
        console.log(chalk.bgRed('   Error JSON   '));
        console.log(chalk.red(JSON.stringify(err, null, 2)));
        return res.status(400).send(Response.error('JSON format', err));
    }

    next();
}

module.exports = JSONFormat;
