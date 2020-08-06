const Mongoose = require('../../../config/db/db.config');

function SessionTokenId() {
    return Mongoose.Types.ObjectId();
}

module.exports = SessionTokenId;
