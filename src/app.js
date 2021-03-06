require('./config/env');
require('./config/db');
const express = require('express');
const chalk = require('chalk');
const router = require('./routes/router');

const app = express();
const port = process.env.PORT || 8080;

router(app);

app.listen(port, () => {
    console.log(chalk.inverse.white(`\nServer running on port ${port}\n`));
});
