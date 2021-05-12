/**
 * Entry point for npm run seed
 */

'use strict';

const chalk = require('chalk');

const seed = require('../utils/seed');

const { Job, Machine } = require('../models');

const jobSeed = require('./job.seed');

const machineSeed = require('./machine.seed');

const { log } = console;

require('dotenv').config();

const connect = require('../services/db.service');

const randomInt = require('../utils/randomInt.utils');

let exit = 0;

connect()
  .then(() => {
    log(chalk.green.bold('...connected to MongoDB!'));
    return Promise.resolve();
  })
  .then(() => {
    log(
      chalk.green('seeding ') +
        chalk.blue('machine') +
        chalk.green(' collection')
    );
    return seed(Machine, machineSeed);
  })
  .then((seededMachines) => {
    const machineIds = seededMachines.map((machine) => {
      log(chalk.blue('added ' + machine.name));
      return machine._id;
    });
    log(chalk.green('success'));
    return Promise.resolve(machineIds);
  })
  .then((ids) => {
    const jobs = jobSeed.map((job) => {
      job.machine = ids[randomInt(0, machineSeed.length - 1)];
      return job;
    });
    log(
      chalk.green('seeding ') + chalk.blue('job') + chalk.green(' collection')
    );
    return seed(Job, jobs);
  })
  .then((seededJobs) => {
    log(chalk.blue('added ' + seededJobs.length + ' jobs'));
    log(chalk.green('success'));
    return Promise.resolve();
  })
  .catch((error) => {
    log(chalk.red(error.message));
    exit = 1;
  })
  .finally(() => {
    log(chalk.green.bold('Done!'));
    process.exit(exit);
  });
