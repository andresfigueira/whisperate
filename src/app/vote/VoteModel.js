const mongoose = require('../../config/db');
const { defaultSchemaOptions } = require('../../shared/services/entity/Entity.helper');

const VoteSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Required',
    },
    score: {
        type: Number,
        enum: [1, 0, -1],
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
}, defaultSchemaOptions);

const VoteModel = mongoose.model('Vote', VoteSchema);
module.exports = VoteModel;
