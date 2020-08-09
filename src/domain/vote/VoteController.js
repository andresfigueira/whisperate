const Assert = require('../../shared/services/assert/Assert');
const Response = require('../../../core/response/Response');
const getCurrentUser = require('../../session/helpers/getCurrentUser');
const BadRequest = require('../../../core/errors/BadRequest');
const NotFound = require('../../../core/errors/NotFound');
const WhisperModel = require('../whisper/WhisperModel');
const VoteWhisperService = require('./services/VoteWhisperService');
const VoteId = require('./value-objects/VoteId');
const WhisperId = require('../whisper/value-objects/WhisperId');
const UserId = require('../user/value-objects/UserId');

const VoteController = {
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
            if (!whisper) { throw new NotFound('Whisper not found'); }

            const user = getCurrentUser(req);
            const vote = new VoteWhisperService(
                req.body.score,
                WhisperId(whisper._id),
                UserId(user._id),
            );
            await vote.save();

            console.log(vote.whisper);

            res.status(200).send(vote.whisper);
        } catch (error) {
            next(error);
        }
    },
};

module.exports = VoteController;
