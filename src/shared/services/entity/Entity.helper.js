const Mongoose = require('../../../config/db/db.config');

function getObjectId(id = null) {
    if (id) { return Mongoose.Types.ObjectId(id); }
    return Mongoose.Types.ObjectId();
}

module.exports = {
    getObjectId,
};
