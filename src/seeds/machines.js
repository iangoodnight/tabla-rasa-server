/**
 * Convenience Seeder for machine collections
 */

'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const { Machine } = require('../models');
const dev_uri = encodeURI(process.env.DEV_DB_URI);
const mongoDb = process.env.MONGO_DB_URI || dev_uri;
mongoose.connect(mongoDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const machines = [
  {
    name: '5-gallon pail-filler',
    capacity: [
      {
        ratePerMinute: 5,
        type: 'can',
      },
    ],
    notes:
      'The same staff member placing the pail on the filler will also label\n' +
      'The second staff member will place the pail on the pallet\n' +
      'A member of the warehouse staff, or manager, will remove the pallet',
    staffing: 2,
  },
  {
    capacity: [
      {
        ratePerMinute: 65,
        type: 'tube',
        size: 'lip balm',
      },
    ],
    name: 'lip balm line',
    notes:
      'If running a private label job for a customer, only requires 5 staff',
    staffing: 6,
  },
  {
    capacity: [
      {
        ratePerMinute: 40,
        type: 'can',
      },
    ],
    name: 'can line filler',
    staffing: 40,
  },
  {
    capacity: [
      {
        ratePerMinute: 50,
        type: 'bottles',
      },
    ],
    name: 'terco 12',
    staffing: 5,
  },
  {
    capacity: [
      {
        ratePerMinute: 100,
        type: 'tube',
      },
    ],
    name: 'tube 4 filler',
    staffing: 9,
  },
  {
    capacity: [
      {
        ratePerMinute: 30,
        type: 'tube',
      },
    ],
    name: 'tube 5 filler',
    staffing: 3,
  },
  {
    capacity: [
      {
        ratePerMinute: 25,
        type: 'bottle',
        size: '8oz',
      },
      {
        ratePerMinute: 15,
        type: 'bottle',
        size: '16oz',
      },
    ],
    name: 'terco 2',
  },
];
const { machineController } = require('../controllers');
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.on('close', () => {
  console.log('\nSuccessfully closed Mongo connection\n');
});
db.once('open', () => {
  console.log('\nSuccesfully connected to Mongo!\n');
  //  const seeds = [];
  const test = new Machine(machines[0]);
  machineController
    .create(test)
    .then((result) => console.log(result))
    .catch((e) => console.log(e));
  //  for (const machine of machines) {
  //    console.log(machine);
  //    const seeded = machineController.create({ machine });
  //    console.log(seeded);
  //    seeds.push(seeded);
  //  };
  //  Promise.allSettled(seeds)
  //    .then(results => console.log(results))
  //    .catch(e => console.log(e));
});
db.close();
