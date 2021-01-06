const UserRouter = require('../app/user/UserRouter');
const middlewares = require('./middlewares/middlewares');
const errorHandler = require('./middlewares/error/error.middleware');
const WhisperRouter = require('../app/whisper/WhisperRouter');
const VoteRouter = require('../app/vote/VoteRouter');
const CommentRouter = require('../app/comment/CommentRouter');
const TagRouter = require('../app/tag/TagRouter');

function router(app) {
    middlewares(app);
    UserRouter(app);
    WhisperRouter(app);
    VoteRouter(app);
    CommentRouter(app);
    TagRouter(app);
    errorHandler(app);
}

module.exports = router;
