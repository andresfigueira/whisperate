const Mongoose = require('../../../config/db');

function getObjectId(id = null) {
    if (id) { return Mongoose.Types.ObjectId(id); }
    return Mongoose.Types.ObjectId();
}

const defaultSchemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    strict: true,
    strictQuery: true,
};

module.exports = {
    getObjectId,
    defaultSchemaOptions,
};
