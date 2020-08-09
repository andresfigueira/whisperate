const Mongoose = require('../../../config/db/db.config');

function UserId(id = null) {
    return Mongoose.Types.ObjectId(id);
}

module.exports = UserId;
