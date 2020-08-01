const Mongoose = require("../../config/db/db.config");

function UserId() {
    return Mongoose.Types.ObjectId();
}

module.exports = UserId;
