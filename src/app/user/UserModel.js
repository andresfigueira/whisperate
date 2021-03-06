const validator = require('validator');
const mongoose = require('../../config/db');
const SuperEncrypterService = require('../../shared/services/super-encrypter/SuperEncrypterService');
const InternalServerError = require('../../../core/errors/InternalServerError');
const { roles } = require('./constants');
const { defaultSchemaOptions } = require('../../shared/services/entity/Entity.helper');

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
    username: {
        type: String,
        required: 'Required',
    },
    email: {
        type: String,
        required: 'Required',
        unique: true,
        validate: {
            validator: validator.isEmail,
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
            roles.superadmin,
            roles.support,
            roles.user,
        ],
        default: roles.user,
    },
    birthday: {
        type: Date,
        required: 'Required',
    },
    country: {
        type: String,
    },
    is_private: {
        type: Boolean,
        default: false,
    },
    session_token: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SessionToken',
    },
}, defaultSchemaOptions);

UserSchema.virtual('fullName')
    .get(function data() { return `${this.first_name} ${this.last_name}`; });

UserSchema.pre('save', async function presave(next) {
    if (this.isModified('password')) {
        const encryptedPassword = await SuperEncrypterService.encrypt(this.password);
        if (!encryptedPassword) { throw new InternalServerError('Error encrypting password'); }
        this.set('password', encryptedPassword);
    }

    next();
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
