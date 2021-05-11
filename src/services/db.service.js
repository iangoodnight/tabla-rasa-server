/**
 * Setup database connection as a service for convenience and testing
 */

'use strict';

const mongoose = require('mongoose');
const dev_uri = encodeURI(process.env.DEV_DB_URI);
const mongoDb = process.env.MONGO_DB_URI || dev_uri;
mongoose.Promise = global.Promise;

module.exports = () =>
  mongoose.connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
