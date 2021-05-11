/**
 * Utilty for seeding MongoDb
 */

'use strict';

const chalk = require('chalk');

module.exports = async (model, seeds) => {
  const { log } = console;
  try {
    log(
      chalk.yellow(
        `dropping collection if exists: ${model.collection.collectionName}`
      )
    );
    model.collection.drop();
  } catch (error) {
    log(chalk.red(`Error dropping collection: ${error.message}`));
  }
  return Promise.all(seeds.map((seed) => new model(seed).save()));
};
