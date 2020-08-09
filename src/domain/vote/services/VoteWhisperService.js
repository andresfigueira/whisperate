const VoteModel = require('../VoteModel');
const WhisperUpdateService = require('../../whisper/services/WhisperUpdateService');
const WhisperModel = require('../../whisper/WhisperModel');
const VoteId = require('../value-objects/VoteId');
const InternalServerError = require('../../../../core/errors/InternalServerError');

class VoteWhisperService {
    constructor(
        score,
        whisperId,
        userId,
    ) {
        this.id = null;
        this.score = score;
        this.whisperId = whisperId;
        this.userId = userId;
        this.whisper = null;
    }

    async save() {
        const query = { $and: [{ whisper: this.whisperId }, { user: this.userId }] };
        const update = {
            score: this.score,
            whisper: this.whisperId,
            user: this.userId,
        };
        const options = { upsert: true, useFindAndModify: false };
        const vote = await VoteModel.findOneAndUpdate(query, update, options, (err) => {
            if (err) { throw new InternalServerError('Cannot save vote'); }
        });

        this.id = vote._id;
        await this.voteForWhisper();
    }

    async voteForWhisper() {
        const query = { _id: this.whisperId };
        // Find and update vote in whisper model
        // https://docs.mongodb.com/manual/reference/method/db.collection.update/#update-arrayfilters
        // const update = { $}
        // await WhisperModel.update(, (err) => {
        //     console.log(err);
        //     if (err) { throw new InternalServerError('Cannot update whisper while voting'); }
        // });

        // whisper.votes_count += 1;
        // whisper.votes.push(this.voteUpdated._id);
        // whisper.save((err) => {
        //     if (err) { throw new InternalServerError('Cannot update whisper while voting'); }
        // });
        // this.whisper = whisper;
    }
}

module.exports = VoteWhisperService;
