const { default: mongoose } = require('../config/db.config');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Required',
    },
    first_name: {
        type: String,
        required: 'Required',
    },
    last_name: {
        type: String,
        required: 'Required',
    },
    email: {
        type: String,
        required: 'Required',
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Must be an email'
        },
    },
    password: {
        type: String,
        required: 'Required',
    },
    birthday: {
        type: Date,
        required: 'Required',
    },
    country: {
        type: Date,
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const UserModel = mongoose.model('User', UserSchema);
exports.default = UserModel;
