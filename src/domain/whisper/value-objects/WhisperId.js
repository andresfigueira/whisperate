const Mongoose = require('../../../config/db/db.config');

function WhisperId(id = null) {
    if (id) { return Mongoose.Types.ObjectId(id); }
    return Mongoose.Types.ObjectId();
}

module.exports = WhisperId;
