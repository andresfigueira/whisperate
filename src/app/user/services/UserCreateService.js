const UserModel = require('../UserModel');
const Conflict = require('../../../../core/errors/Conflict');

class UserCreateService {
    constructor(
        id,
        firstName,
        lastName,
        username,
        email,
        password,
        birthday,
        country,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.country = country;
    }

    async save() {
        const user = new UserModel({
            _id: this.id,
            first_name: this.firstName,
            last_name: this.lastName,
            username: this.username,
            email: this.email,
            password: this.password,
            birthday: this.birthday,
            country: this.country,
        });

        const duplicated = await UserModel.findOne({ email: this.email });
        if (duplicated) {
            throw new Conflict('User already exists');
        }

        const response = await user.save();
        return response;
    }
}

module.exports = UserCreateService;
