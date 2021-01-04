const Assert = require('../../shared/services/assert/Assert');
const Response = require('../../../core/response/Response');
const getCurrentUser = require('../../session/helpers/getCurrentUser');
const BadRequest = require('../../../core/errors/BadRequest');
const NotFound = require('../../../core/errors/NotFound');
const WhisperModel = require('../whisper/WhisperModel');
const VoteWhisperService = require('./services/VoteWhisperService');
const { getObjectId } = require('../../shared/services/entity/Entity.helper');
const { scoreEnum } = require('./constants');

const VoteController = {
    vote: async (req, res, next) => {
        try {
            const assert = new Assert({
                id: req.params.id,
                score: req.body.score,
            }, {
                id: { required: true },
                score: {
                    required: true,
                    validate: (value) => scoreEnum.includes(Number(value)),
                    validateMessage: 'Must be 1 or -1',
                },
            });
            if (!assert.isValid()) {
                throw new BadRequest(Response.error(assert.invalidMessage, assert.errors));
            }

            const whisper = await WhisperModel
                .findOne({ _id: req.params.id })
                .exec();
            if (!whisper) { throw new NotFound('Whisper not found'); }

            const user = getCurrentUser(req);
            const vote = new VoteWhisperService(
                req.body.score,
                getObjectId(whisper._id),
                getObjectId(user._id),
            );
            await vote.save();

            res.status(200).send(null);
        } catch (error) {
            next(error);
        }
    },
};

module.exports = VoteController;
