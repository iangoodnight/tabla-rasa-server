const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./api');
const { log } = console;
const chalk = require('chalk');

// serve up api routes from 'api' directory
router.use('/api', apiRoutes);

// test for monorepo
try {
  if (fs.existsSync(path.join(__dirname, '../../../client'))) {
    log(chalk.green('Monorepo detected... serving client'));
    // serve up static assets
    router.use(express.static(path.join(__dirname, '../../../client/build')));
    router.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../../client/build/index.html'));
    });
  }
} catch (e) {
  log(chalk.red('No client detected, loading API only'));
}

module.exports = router;
