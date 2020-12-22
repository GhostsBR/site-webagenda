const express = require('express');
const mustache = require('mustache-express');
const router = require('./routes/index');
const helpers = require('./helpers');
const errorHandler = require('./handlers/errorHandler');

//Config
const app = express();

app.use((req, res, next) => {
    res.locals.h = helpers;
    next();
})

app.use('/', router);

//Error 404
app.use(errorHandler.pageNotFound);

app.engine('mst', mustache());
app.set('view engine', 'mst');
app.set('views', __dirname + '/views/pages');

module.exports = app;