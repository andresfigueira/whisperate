const UserRouter = require('../user/UserRouter');
const middlewares = require('./middlewares/middlewares');
const errorMiddleware = require('./middlewares/error/error.middleware');

function router(app) {
    middlewares(app);
    UserRouter(app);
    app.use(errorMiddleware);
}

module.exports = router;
