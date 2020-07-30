require('./config/env.config');
require('./config/db.config');
const express = require('express');
const { default: Router } = require('./Router');

const app = express();
const port = process.env.PORT;
const router = new Router(app);
router.init();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
