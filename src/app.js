/**
 * Setting up the express 'APP' object
 */

'use strict';

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

const app = express();

/* Configure CORS options for production */
// const corsOptions = {}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// CORS setup
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(';')
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// Passport
require('./middleware/passport')(app);
// Routing
const routes = require('./routes');

app.use(routes);

module.exports = app;
