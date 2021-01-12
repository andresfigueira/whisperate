const Assert = require('../../shared/services/assert/Assert');
const Response = require('../../../core/response/Response');
const getCurrentUser = require('../../session/helpers/getCurrentUser');
const BadRequest = require('../../../core/errors/BadRequest');
const NotFound = require('../../../core/errors/NotFound');
const WhisperModel = require('../whisper/WhisperModel');
const { getObjectId } = require('../../shared/services/entity/Entity.helper');
const CommentModel = require('./CommentModel');

const CommentController = {
    all: async (req, res, next) => {
        try {
            const {
                sort_by: sortBy = 'created_at',
                sort_direction: sortDirection = 'ASC',
                ...filters
            } = req.query;
            const comments = await CommentModel
                .find({
                    ...filters,
                    whisper_id: req.params.whisperId,
                })
                .sort({ [sortBy]: sortDirection })
                .exec();

            res.status(200).send(comments);
        } catch (error) {
            next(error);
        }
    },
    comment: async (req, res, next) => {
        try {
            const assert = new Assert({ ...req.body, whisperId: req.params.whisperId }, {
                whisperId: { required: true },
                text: { required: true },
                anonymous: { type: Boolean },
            });
            if (!assert.isValid()) {
                throw new BadRequest(Response.error(assert.invalidMessage, assert.errors));
            }

            const whisper = await WhisperModel
                .findOne({ _id: req.params.whisperId })
                .exec();
            if (!whisper) { throw new NotFound('Whisper not found'); }

            const user = getCurrentUser(req);
            const data = {
                _id: getObjectId(),
                text: req.body.text,
                whisper_id: getObjectId(whisper._id),
                user_id: getObjectId(user._id),
                anonymous: !!req.body.anonymous,
            };
            const model = new CommentModel(data);
            const comment = await model.save();

            res.status(200).send(comment);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const assert = new Assert(req.params, {
                whisperId: { required: true },
                id: { required: true },
            });
            if (!assert.isValid()) {
                throw new BadRequest(Response.error(assert.invalidMessage, assert.errors));
            }

            /* !!! 403 forbidden !userId */

            const { _id: userId } = getCurrentUser(req);
            await CommentModel.deleteOne({
                _id: req.params.id,
                user_id: userId,
            });

            res.status(200).send();
        } catch (error) {
            next(error);
        }
    },
};

module.exports = CommentController;
