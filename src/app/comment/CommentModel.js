const mongoose = require('../../config/db');
const { defaultSchemaOptions } = require('../../shared/services/entity/Entity.helper');

const CommentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Required',
    },
    text: {
        type: String,
        required: 'Required',
        maxlength: 1024,
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

const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports = CommentModel;
