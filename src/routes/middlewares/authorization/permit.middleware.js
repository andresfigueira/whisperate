const isAuthenticated = require('../authentication/isAuthenticated');
const Roles = require('../../../domain/user/value-objects/Roles');
const getCurrentUser = require('../../../session/helpers/getCurrentUser');
const Forbidden = require('../../../../core/errors/Forbidden');

function permit(...allowed) {
    const isAllowed = (role) => {
        if (role === Roles.superadmin) {
            return true;
        }

        return allowed.indexOf(role) > -1;
    };

    return (req, res, next) => {
        try {
            isAuthenticated(req, res, next);

            const { role } = getCurrentUser(req);
            if (!role || !isAllowed(role)) {
                throw new Forbidden();
            }
        } catch (error) {
            next(error);
        }
    };
}

module.exports = permit;
