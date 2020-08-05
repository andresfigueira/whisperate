const UserRouter = require('../user/UserRouter');
const middlewares = require('./middlewares/middlewares');
const errorMiddleware = require('./middlewares/error/error.middleware');
const WhisperRouter = require('../whisper/WhisperRouter');

function router(app) {
    middlewares(app);
    UserRouter(app);
    WhisperRouter(app);
    errorMiddleware(app);
}

module.exports = router;
