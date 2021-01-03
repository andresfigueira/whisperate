const UserRouter = require('../app/user/UserRouter');
const middlewares = require('./middlewares/middlewares');
const errorHandler = require('./middlewares/error/error.middleware');
const WhisperRouter = require('../app/whisper/WhisperRouter');
const VoteRouter = require('../app/vote/VoteRouter');

function router(app) {
    middlewares(app);
    UserRouter(app);
    WhisperRouter(app);
    VoteRouter(app);
    errorHandler(app);
}

module.exports = router;
