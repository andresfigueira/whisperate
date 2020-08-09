const Mongoose = require('../../../config/db/db.config');

function SessionTokenId(id = null) {
    return Mongoose.Types.ObjectId(id);
}

module.exports = SessionTokenId;
