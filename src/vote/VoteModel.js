const mongoose = require('../config/db/db.config');

const VoteSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Required',
    },
    value: {
        type: Number,
        enum: [1, -1],
        required: 'Required',
    },
    whisper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Whisper',
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

const VoteModel = mongoose.model('Vote', VoteSchema);
module.exports = VoteModel;
