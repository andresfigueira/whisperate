const dotenv = require('dotenv');

const env = {
    init: () => {
        dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
    },
};

env.init();

module.exports = env;
