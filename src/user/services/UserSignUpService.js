const { default: UserModel } = require("../UserModel");

class UserSignUpService {
    constructor(
        id,
        first_name,
        last_name,
        email,
        password,
        birthday,
        country,
    ) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.country = country;
    }

    save() {
        return new Promise((resolve, reject) => {
            const user = new UserModel({
                _id: this.id,
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
                birthday: this.birthday,
                country: this.country,
            });
    
            user.save().then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }
}

exports.default = UserSignUpService;
