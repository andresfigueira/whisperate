const UserRouter = require('../domain/user/UserRouter');
const middlewares = require('./middlewares/middlewares');
const errorHandler = require('./middlewares/error/error.middleware');
const WhisperRouter = require('../domain/whisper/WhisperRouter');
const VoteRouter = require('../domain/vote/VoteRouter');

function router(app) {
    middlewares(app);
    UserRouter(app);
    WhisperRouter(app);
    VoteRouter(app);
    errorHandler(app);
}

module.exports = router;
