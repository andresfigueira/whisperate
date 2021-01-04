const WhisperModel = require('./WhisperModel');
const Assert = require('../../shared/services/assert/Assert');
const Response = require('../../../core/response/Response');
const getCurrentUser = require('../../session/helpers/getCurrentUser');
const BadRequest = require('../../../core/errors/BadRequest');
const NotFound = require('../../../core/errors/NotFound');
const Forbidden = require('../../../core/errors/Forbidden');
const WhisperCreateService = require('./services/WhisperCreateService');
const WhisperDeleteService = require('./services/WhisperDeleteService');
const { getObjectId } = require('../../shared/services/entity/Entity.helper');

const WhisperController = {
    all: async (req, res, next) => {
        try {
            const max = 30;
            const {
                page = 0,
                sort_by: sortBy = 'created_at',
                sort_direction: sortDirection = 'DESC',
                ...filters
            } = req.query;
            const whispers = await WhisperModel
                .find({ ...filters })
                .sort({ [sortBy]: sortDirection })
                .limit(max)
                .skip(max * page)
                .exec();

            res.status(200).send(whispers);
        } catch (error) {
            next(error);
        }
    },
    id: async (req, res, next) => {
        try {
            const assert = new Assert(req.params, {
                id: { required: true },
            });
            if (!assert.isValid()) {
                throw new BadRequest(Response.error(assert.invalidMessage, assert.errors));
            }

            const whisper = await WhisperModel
                .findOne({ _id: req.params.id })
                .populate('user')
                .exec();
            if (!whisper) { throw new NotFound(); }

            res.status(200).send(whisper);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const assert = new Assert(req.body, {
                title: { required: true },
                body: { required: true },
                is_private: { type: Boolean },
            });
            if (!assert.isValid()) {
                throw new BadRequest(Response.error(assert.invalidMessage, assert.errors));
            }

            const { _id: userId } = getCurrentUser(req);
            const whisper = new WhisperModel({
                _id: getObjectId(),
                title: req.body.title,
                body: req.body.body,
                type: req.body.type,
                is_private: req.body.is_private,
                user_id: userId,
            });
            const response = await whisper.save();

            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const assert = new Assert(req.params, {
                id: { required: true },
            });
            if (!assert.isValid()) {
                throw new BadRequest(Response.error(assert.invalidMessage, assert.errors));
            }

            const { id } = req.params;
            const { _id: userId } = getCurrentUser(req);
            const whisper = await WhisperModel
                .findOne({ _id: id })
                .exec();
            if (!whisper) { throw new NotFound(); }

            const cannotDelete = userId !== whisper?.user_id?.toString();
            if (cannotDelete) { throw new Forbidden(); }

            const remover = new WhisperDeleteService({ _id: id });
            await remover.save();

            res.status(200).send();
        } catch (error) {
            next(error);
        }
    },
};

module.exports = WhisperController;
