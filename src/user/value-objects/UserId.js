const { default: Mongoose } = require("../../config/db.config");

function UserId() {
    return Mongoose.Types.ObjectId();
}

exports.default = UserId;