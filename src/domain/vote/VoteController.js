const Assert = require('../../shared/services/assert/Assert');
const Response = require('../../../core/response/Response');
const getCurrentUser = require('../../session/helpers/getCurrentUser');
const BadRequest = require('../../../core/errors/BadRequest');
const NotFound = require('../../../core/errors/NotFound');
const WhisperModel = require('../whisper/WhisperModel');

const WhisperController = {
    vote: async (req, res, next) => {
        try {
            const assert = new Assert({
                id: req.params.id,
                score: req.body.score,
            }, {
                id: {
                    required: true,
                },

            });
            if (!assert.isValid()) {
                throw new BadRequest(Response.error(assert.invalidMessage, assert.errors));
            }

            const whisper = await WhisperModel.findOne({ _id: req.params.id }).exec();
            if (!whisper) { throw new NotFound(); }

            const { _id: userId } = getCurrentUser(req);

            console.log({ whisper, userId });
            // res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    },
};

module.exports = WhisperController;
