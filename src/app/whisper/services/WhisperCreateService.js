const WhisperModel = require('../WhisperModel');

class WhisperCreateService {
    constructor(
        id,
        text,
        isPrivate,
        user,
        type,
        views,
        votes,
        upVotes,
        downVotes,
        tags,
        files,
    ) {
        this.id = id;
        this.text = text;
        this.type = type;
        this.views = views;
        this.votes = votes;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
        this.isPrivate = isPrivate;
        this.user = user;
        this.tags = tags;
        this.files = files;
    }

    async save() {
        const whisper = new WhisperModel({
            _id: this.id,
            text: this.text,
            type: this.type,
            views: this.views,
            votes: this.votes,
            up_votes: this.upVotes,
            down_votes: this.downVotes,
            is_private: this.isPrivate,
            user: this.user,
            tags: this.tags,
            files: this.files,
        });

        const response = await whisper.save();
        return response;
    }
}

module.exports = WhisperCreateService;
