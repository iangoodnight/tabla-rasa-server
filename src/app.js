/**
 * Setting up the express 'APP' object
 */

'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// Passport
require('./middleware/passport')(app);
// Routing
const routes = require('./routes');

app.use(routes);

module.exports = app;
