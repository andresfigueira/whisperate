const express = require('express');
const { default: UserRouter } = require('./user/UserRouter');
const chalk = require('chalk');

function router(app) {
    middlewares(app);
    UserRouter(app);
}

function middlewares(app) {
    app.use(express.json());
    app.use((err, req, res, next) => {
        if (err) {
            console.log(chalk.bgRed('   Error JSON   '));
            console.log(chalk.red(JSON.stringify(err, null, 2)));
            res.status(400).send(err);
            return;
        }
        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use((err, req, res, next) => {
        if (err) {
            console.log(chalk.bgRed('   Error URL encoded   '));
            console.log(chalk.red(JSON.stringify(err, null, 2)));
            res.status(400).send(err);
            return;
        }
        next();
    });
}

exports.default = router;
