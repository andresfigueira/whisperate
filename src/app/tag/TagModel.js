const mongoose = require('../../config/db');
const { defaultSchemaOptions } = require('../../shared/services/entity/Entity.helper');

const TagSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Required',
    },
    name: {
        type: String,
        unique: true,
        required: 'Required',
        maxlength: 128,
    },
    whispers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Whisper',
        required: 'Required',
    }],
}, defaultSchemaOptions);

const TagModel = mongoose.model('Tag', TagSchema);
module.exports = TagModel;
