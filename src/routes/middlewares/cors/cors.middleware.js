const cors = require('cors');

function corsHandler(app) {
    const whitelist = ['http://localhost:19006'];
    const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            if (whitelist.includes(origin)) { return callback(null, true); }
            return callback(new Error('Not allowed by CORS'));
        },
    };

    app.use(cors(corsOptions));
}

module.exports = corsHandler;
