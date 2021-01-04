const VoteModel = require('../VoteModel');
const WhisperModel = require('../../whisper/WhisperModel');
const InternalServerError = require('../../../../core/errors/InternalServerError');
const NotFound = require('../../../../core/errors/NotFound');
const { getObjectId } = require('../../../shared/services/entity/Entity.helper');

class VoteWhisperService {
    constructor(
        score,
        whisperId,
        userId,
    ) {
        this.score = score;
        this.whisperId = whisperId;
        this.userId = userId;
        this.vote = null;
        this.previousVote = null;
        this.whisper = null;
    }

    async save() {
        this.whisper = await WhisperModel.findById(this.whisperId);
        if (!this.whisper) { throw new NotFound(); }

        // Already voted same score
        const query = { whisper_id: this.whisperId, user_id: this.userId };
        this.previousVote = await VoteModel.findOne(query).sort({ created_at: -1 });
        if (this.score === this.previousVote?.score) { return; }

        // Update previous vote to inactive
        if (this.previousVote) {
            this.previousVote.active = false;
            await this.previousVote.save((err) => {
                if (err) { throw new InternalServerError('Cannot update previous vote'); }
            });
        }

        // Create active vote
        const data = {
            _id: getObjectId(),
            score: this.score,
            whisper_id: this.whisperId,
            user_id: this.userId,
            active: true,
        };
        this.vote = await VoteModel.create(data);

        await this.voteForWhisper();
    }

    async voteForWhisper() {
        this.whisper.total_votes += this.totalVotesSum();
        this.whisper.up_votes += this.votesSum(true);
        this.whisper.down_votes += this.votesSum(false);
        await this.whisper.save((err) => {
            if (err) { throw new InternalServerError('Cannot update whisper'); }
        });
    }

    totalVotesSum() {
        const previous = this.previousVote?.score;
        if (this.previousVote && previous !== 0 && this.score === 0) { return -1; }
        if ((!this.previousVote || previous === 0) && this.score !== 0) { return 1; }
        return 0;
    }

    votesSum(isUp = true) {
        const previous = this.previousVote?.score;
        const n = isUp ? 1 : -1;
        if (previous !== n && this.score === n) { return 1; }
        if (previous === n && this.score !== n) { return -1; }
        return 0;
    }
}

module.exports = VoteWhisperService;
