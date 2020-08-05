const mongoose = require('../config/db/db.config');

const WhisperSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Required',
    },
    text: {
        type: String,
        required: 'Required',
        maxlength: 255,
    },
    type: {
        type: String,
        enum: ['text', 'question'],
        default: 'text',
    },
    votes: {
        type: Number,
        default: 0,
    },
    up_votes: {
        type: Number,
        default: 0,
    },
    down_votes: {
        type: Number,
        default: 0,
    },
    private: {
        type: Boolean,
        default: false,
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

const WhisperModel = mongoose.model('Whisper', WhisperSchema);
module.exports = WhisperModel;
