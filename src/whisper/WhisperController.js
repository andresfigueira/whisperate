const WhisperModel = require('./WhisperModel');
const WhisperId = require('./value-objects/WhisperId');
const mongoose = require('../config/db/db.config');
const Assert = require('../shared/services/assert/Assert');
const BaseError = require('../../core/errors/BaseError');
const Response = require('../../core/response/Response');

const WhisperController = {
    create: (req, res, next) => {
        try {
            const assert = new Assert(req.body, {
                text: {
                    required: true,
                },
            });

            if (!assert.isValid()) {
                throw new BaseError(400, Response.error(assert.invalidMessage, assert.errors));
            }

            const id = WhisperId();
            const userId = '';
            const whisper = new WhisperModel({
                _id: id,
                text: req.body.text,
                private: req.body.private,
                user: mongoose.Types.ObjectId(userId),
            });

            whisper.save().then(async (response) => {
                console.log(response);
            });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = WhisperController;
