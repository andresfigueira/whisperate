const mongoose = require('../../config/db/db.config');
const WhisperTypes = require('./value-objects/WhisperTypes');

const WhisperSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Required',
    },
    text: {
        type: String,
        required: 'Required',
        maxlength: 1024,
    },
    type: {
        type: String,
        enum: [WhisperTypes.text, WhisperTypes.question],
        default: WhisperTypes.text,
    },
    views: {
        type: Number,
        default: 0,
    },
    votes_count: {
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
    is_private: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Required',
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: 'Required',
    }],
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    files: [{
        url: { type: String, required: true },
    }],
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

const WhisperModel = mongoose.model('Whisper', WhisperSchema);
module.exports = WhisperModel;
