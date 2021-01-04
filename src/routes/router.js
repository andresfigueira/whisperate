const UserRouter = require('../app/user/UserRouter');
const middlewares = require('./middlewares/middlewares');
const errorHandler = require('./middlewares/error/error.middleware');
const WhisperRouter = require('../app/whisper/WhisperRouter');
const VoteRouter = require('../app/vote/VoteRouter');
const CommentRouter = require('../app/comment/CommentRouter');

function router(app) {
    middlewares(app);
    UserRouter(app);
    WhisperRouter(app);
    VoteRouter(app);
    CommentRouter(app);
    errorHandler(app);
}

module.exports = router;
