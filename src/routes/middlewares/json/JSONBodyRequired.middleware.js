const ObjectHelper = require('../../../shared/helpers/Object.helper');
const Response = require('../../../../core/response/Response');

function JSONBodyRequired(req, res, next) {
    if (req.is('application/json') && ObjectHelper.isEmpty(req.body)) {
        res.status(400).send(Response.error('Request must have a JSON body'));
        return;
    }

    next();
}

module.exports = JSONBodyRequired;
