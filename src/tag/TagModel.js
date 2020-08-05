const mongoose = require('../config/db/db.config');

const TagSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Required',
    },
    name: {
        type: String,
        required: 'Required',
        maxlength: 128,
    },
    whispers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Whisper',
        required: 'Required',
    }],
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

const TagModel = mongoose.model('Tag', TagSchema);
module.exports = TagModel;
