const mongoose = require('../../config/db');
const { defaultSchemaOptions } = require('../../shared/services/entity/Entity.helper');
const { scoreEnum } = require('./constants');

const VoteSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Required',
    },
    score: {
        type: Number,
        enum: scoreEnum,
        required: 'Required',
    },
    whisper_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Whisper',
        required: 'Required',
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Required',
    },
    active: {
        type: Boolean,
        default: true,
    },
}, defaultSchemaOptions);

const VoteModel = mongoose.model('Vote', VoteSchema);
module.exports = VoteModel;
