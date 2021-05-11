/**
 * Convenience functions for setting up and tearing down test env
 */

'use strict';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();

module.exports = {
  dbConnect: async () => {
    const uri = await mongoServer.getUri();

    const mongooseOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    await mongoose.connect(uri, mongooseOptions);
  },
  dbDisconnect: async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  },
};
