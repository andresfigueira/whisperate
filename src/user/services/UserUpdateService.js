const UserModel = require('../UserModel');
const BaseError = require('../../../core/errors/BaseError');

class UserUpdateService {
    constructor(id, values) {
        this.id = id;
        this.values = values;
        delete this.values._id;
    }

    async save() {
        const user = await UserModel.findOne({ _id: this.id }).exec();
        if (!user) {
            throw new BaseError(404, 'User not found');
        }

        const query = { _id: this.id };
        const options = {
            new: true,
            useFindAndModify: false,
        };
        const updated = await UserModel.findOneAndUpdate(
            query,
            this.values,
            options,
            (err, doc) => {
                if (err) { throw new BaseError(500, 'Cannot update user'); }
                return doc;
            },
        );

        return updated;
    }
}

module.exports = UserUpdateService;
