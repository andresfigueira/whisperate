const validator = require('validator');
const mongoose = require('../config/db/db.config');
const SuperEncrypterService = require('../shared/services/super-encrypter/SuperEncrypterService');
const Roles = require('./value-objects/Roles');

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
            message: 'Must be an email',
        },
    },
    password: {
        type: String,
        required: 'Required',
    },
    role: {
        type: String,
        enum: [
            Roles.superadmin,
            Roles.support,
            Roles.user,
        ],
        default: Roles.user,
    },
    birthday: {
        type: Date,
        required: 'Required',
    },
    country: {
        type: String,
    },
    session_token: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SessionToken',
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

UserSchema.pre('save', async function presave(next) {
    if (this.isModified('password')) {
        const encryptedPassword = await SuperEncrypterService.encrypt(this.password);
        if (!encryptedPassword) { throw new Error('Error encrypting password'); }
        this.set('password', encryptedPassword);
    }

    next();
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
