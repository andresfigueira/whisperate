const ObjectHelper = require('../../../shared/helpers/Object.helper');
const BadRequest = require('../../../../core/errors/BadRequest');

function JSONBodyRequired(req, res, next) {
    if (req.is('application/json') && ObjectHelper.isEmpty(req.body)) {
        throw new BadRequest('Request must have a JSON body');
    }

    next();
}

module.exports = JSONBodyRequired;
