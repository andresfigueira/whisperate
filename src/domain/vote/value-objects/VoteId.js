const Mongoose = require('../../../config/db/db.config');

function VoteId(id = null) {
    return Mongoose.Types.ObjectId(id);
}

module.exports = VoteId;
