const WhisperModel = require('../WhisperModel');

class WhisperDeleteService {
    constructor(query) {
        this.query = query;
    }

    async save() {
        const response = await WhisperModel.deleteOne(this.query);
        return response;
    }
}

module.exports = WhisperDeleteService;
