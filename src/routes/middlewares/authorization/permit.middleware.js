const isAuthenticated = require('../authentication/isAuthenticated');
const getCurrentUser = require('../../../session/helpers/getCurrentUser');
const Forbidden = require('../../../../core/errors/Forbidden');
const { roles } = require('../../../app/user/constants');

function permit(...allowed) {
    const isAllowed = (role) => {
        if (role === roles.superadmin) {
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
