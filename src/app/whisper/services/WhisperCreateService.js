const WhisperModel = require('../WhisperModel');

class WhisperCreateService {
    constructor({
        id,
        title,
        body,
        isPrivate,
        userId,
        type,
        views,
        votes,
        upVotes,
        downVotes,
        tags,
        files,
    }) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.type = type;
        this.views = views;
        this.votes = votes;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
        this.isPrivate = isPrivate;
        this.userId = userId;
        this.tags = tags;
        this.files = files;
    }

    async save() {
        const whisper = new WhisperModel({
            _id: this.id,
            title: this.title,
            body: this.body,
            type: this.type,
            views: this.views,
            votes: this.votes,
            up_votes: this.upVotes,
            down_votes: this.downVotes,
            is_private: this.isPrivate,
            user_id: this.userId,
            tags: this.tags,
            files: this.files,
        });

        const response = await whisper.save();
        return response;
    }
}

module.exports = WhisperCreateService;
