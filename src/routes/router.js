const UserRouter = require('../user/UserRouter');
const middlewares = require('./middlewares/middlewares');

function router(app) {
    middlewares(app);
    UserRouter(app);
}

module.exports = router;
