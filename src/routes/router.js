const UserRouter = require('../user/UserRouter');
const middlewares = require('./middlewares/middlewares');
const errorHandler = require('./middlewares/error/error.middleware');
const WhisperRouter = require('../whisper/WhisperRouter');

function router(app) {
    middlewares(app);
    UserRouter(app);
    WhisperRouter(app);
    errorHandler(app);
}

module.exports = router;
