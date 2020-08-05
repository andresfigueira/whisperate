const mongoose = require('../config/db/db.config');

const SessionTokenSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Required',
    },
    token: {
        type: String,
        required: 'Required',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Required',
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

const SessionTokenModel = mongoose.model('SessionToken', SessionTokenSchema);
module.exports = SessionTokenModel;
