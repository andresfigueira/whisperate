const mongoose = require('../config/db/db.config');
const validator = require('validator');
const CipherService = require('../shared/services/cipher/CipherService');

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
        type: String,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

UserSchema.pre('save', async function (next) {
    const user = this;

    if (this.isModified('password')) {
        const cipher = new CipherService();
        const encryptedPassword = cipher.encrypt(this.password);
        if (!encryptedPassword)
            throw new Error('Error encrypting password');
        this.set('password', encryptedPassword);
    }

    next();
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
