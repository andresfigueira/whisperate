const Mongoose = require('../../../config/db/db.config');

function WhisperId() {
    return Mongoose.Types.ObjectId();
}

module.exports = WhisperId;
