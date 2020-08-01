const express = require('express');
const Response = require('../../../core/response/Response');
const chalk = require('chalk');

function middlewares(app) {
    app.use(express.json());
    app.use((err, req, res, next) => {
        if (err) {
            console.log(chalk.bgRed('   Error JSON   '));
            console.log(chalk.red(JSON.stringify(err, null, 2)));
            res.status(400).send(Response.error('Error JSON', err));
            return;
        }
    });
    app.use((req, res, next) => {
        if (req.is('application/json') && !req.body) {
            res.status(400).send(Response.error('Request must have a JSON body'))
            return;
        }

        next();
    });

    // app.use(express.urlencoded({ extended: true }));
    // app.use((err, req, res, next) => {
    //     if (err) {
    //         console.log(chalk.bgRed('   Error URL encoded   '));
    //         console.log(chalk.red(JSON.stringify(err, null, 2)));
    //         res.status(400).send(err);
    //         return;
    //     }
    //     next();
    // });
}

module.exports = middlewares;
