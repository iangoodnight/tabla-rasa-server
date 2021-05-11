/**
 * Entry point for npm run seed
 */

'use strict';

const chalk = require('chalk');

const seed = require('../utils/seed');

const { Machine } = require('../models');

const machineSeed = require('./machines');

const { log } = console;

require('dotenv').config();

const connect = require('../services/db.service');

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
    seededMachines.map((machine) => log(chalk.blue('added ' + machine.name)));
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
