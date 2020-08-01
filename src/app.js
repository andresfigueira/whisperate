require('./config/env/env.config');
require('./config/db/db.config');
const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const Router = require('./routes/router');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

Router(app);

app.listen(port, () => {
    console.log(chalk.inverse.white(`\nServer running on port ${port}\n`));
});
