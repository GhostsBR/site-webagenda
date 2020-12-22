const express = require('express');
const router = require('./routes/index');
const helpers = require('./helpers');

//Config
const app = express();

app.use((req, res, next) => {
    res.locals.h = helpers;
    next();
})

app.use('/', router);

module.exports = app;