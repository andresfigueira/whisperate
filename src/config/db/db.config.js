const mongoose = require('mongoose');

const {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_AUTHENTICATION_DATABASE,
} = process.env;
const host = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}`;

mongoose.connect(`${host}/${DATABASE_NAME}?authSource=${DATABASE_AUTHENTICATION_DATABASE}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', () => {
    throw new Error('Unable to connect to database');
});

module.exports = mongoose;
