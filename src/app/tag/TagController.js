const Assert = require('../../shared/services/assert/Assert');
const Response = require('../../../core/response/Response');
const BadRequest = require('../../../core/errors/BadRequest');
const { getObjectId } = require('../../shared/services/entity/Entity.helper');
const TagModel = require('./TagModel');

const TagController = {
    create: async (req, res, next) => {
        try {
            const assert = new Assert(req.body, {
                name: {
                    required: true,
                    maxLength: 5,
                },
            });
            if (!assert.isValid()) {
                throw new BadRequest(Response.error(assert.invalidMessage, assert.errors));
            }

            const tag = new TagModel({
                _id: getObjectId(),
                name: req.body.name,
            });
            const response = await tag.save();

            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    },
    findWhispersByName: async (req, res, next) => {
        try {
            // const {
            //     sort_by: sortBy = 'created_at',
            //     sort_direction: sortDirection = 'DESC',
            //     name,
            // } = req.query;
            // const whispers = await TagModel
            //     .find({ name })
            //     .sort({ [sortBy]: sortDirection })
            //     .exec();

            res.status(200).send(null);
        } catch (error) {
            next(error);
        }
    },
};

module.exports = TagController;
