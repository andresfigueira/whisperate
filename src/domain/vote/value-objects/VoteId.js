const Mongoose = require('../../../config/db/db.config');

function VoteId() {
    return Mongoose.Types.ObjectId();
}

module.exports = VoteId;
