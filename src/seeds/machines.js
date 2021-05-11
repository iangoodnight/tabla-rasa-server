/**
 * Convenience Seeder for machine collections
 */

'use strict';

require('dotenv').config();

const { log } = console;
// Connect to DB
const db = require('../services/db.service')()
  .then(() => log('\nConnected to MongoDB!\n'))
  .catch(error => {
    log('Mongo connection error: ' + error.message);
    process.exit(1);
  });

const { Machine } = require('../models');

// Drop collection if exists
try {
  Machine.collection.drop();
  log('...dropping collection if exists');
} catch (error) {
  log(error.message);
}

const machineSeeds = [
  {
    name: 'can line 1',
  }, {
    name: 'terco 12',
  }, {
    name: 'lip balm filler',
  }, {
    name: 'pail filler',
  }
];

const seedDb = async (seeds) => {
  seeds.forEach(async seed => {
    await new Machine(seed).save();
  });
}

seedDb(machineSeeds);
