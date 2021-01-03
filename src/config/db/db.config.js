const Mongoose = require('mongoose');
const InternalServerError = require('../../../core/errors/InternalServerError');

const { DATABASE_CONNECTION_URI } = process.env;

Mongoose.connect(DATABASE_CONNECTION_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

Mongoose.connection.on('error', () => {
    throw new InternalServerError('Unable to connect to database');
});

module.exports = Mongoose;
