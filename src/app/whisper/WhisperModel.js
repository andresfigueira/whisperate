const mongoose = require('../../config/db');
const { defaultSchemaOptions } = require('../../shared/services/entity/Entity.helper');
const { WhisperTypes } = require('./constants');

const WhisperSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Required',
    },
    title: {
        type: String,
        required: 'Required',
        maxlength: 1024,
    },
    body: {
        type: String,
        required: 'Required',
        maxlength: 8192,
    },
    type: {
        type: String,
        enum: Object.values(WhisperTypes),
        default: WhisperTypes.text,
    },
    total_views: {
        type: Number,
        default: 0,
    },
    total_votes: {
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
    anonymous: {
        type: Boolean,
        default: false,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Required',
    },
}, defaultSchemaOptions);

const WhisperModel = mongoose.model('Whisper', WhisperSchema);
module.exports = WhisperModel;
