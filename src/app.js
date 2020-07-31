require('./config/env.config');
require('./config/db.config');
const express = require('express');
const { default: router } = require('./router');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 8080;
app.use(cors);
router(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
