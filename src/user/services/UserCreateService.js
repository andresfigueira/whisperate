const UserModel = require('../UserModel');

class UserCreateService {
    constructor(
        id,
        firstName,
        lastName,
        email,
        password,
        birthday,
        country,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.country = country;
    }

    save() {
        return new Promise((resolve, reject) => {
            const user = new UserModel({
                _id: this.id,
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                password: this.password,
                birthday: this.birthday,
                country: this.country,
            });

            user.save().then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = UserCreateService;
