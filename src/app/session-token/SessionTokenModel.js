const mongoose = require('../../config/db');
const { defaultSchemaOptions } = require('../../shared/services/entity/Entity.helper');

const SessionTokenSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Required',
    },
    token: {
        type: String,
        required: 'Required',
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Required',
    },
}, defaultSchemaOptions);

const SessionTokenModel = mongoose.model('SessionToken', SessionTokenSchema, 'session_tokens');
module.exports = SessionTokenModel;
