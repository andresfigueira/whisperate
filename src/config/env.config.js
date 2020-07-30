const env = {
    init: () => {
        require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
    }
}

env.init();

exports.default = env;
