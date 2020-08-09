const WhisperModel = require('../WhisperModel');
const InternalServerError = require('../../../../core/errors/InternalServerError');

class WhisperUpdateService {
    constructor(id, values) {
        this.id = id;
        this.values = values;
        delete this.values._id;
    }

    async save() {
        const query = { _id: this.id };
        const options = {
            new: true,
            useFindAndModify: false,
        };
        const updated = await WhisperModel.findOneAndUpdate(
            query,
            this.values,
            options,
            (err, doc) => {
                if (err) { throw new InternalServerError('Cannot update whisper'); }
                return doc;
            },
        );

        return updated;
    }
}

module.exports = WhisperUpdateService;
