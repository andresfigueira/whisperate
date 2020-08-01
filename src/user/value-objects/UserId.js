const Mongoose = require("../../config/db.config");

function UserId() {
    return Mongoose.Types.ObjectId();
}

module.exports = UserId;
