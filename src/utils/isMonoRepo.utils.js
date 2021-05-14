/**
 * Checks for instance of monorepo to allow for serving of client
 */

'use strict';

const fs = require('fs');
const path = require('path');

function isMonoRepo() {
  try {
    if (fs.existsSync(path.join(__dirname, '../../../client'))) return true;
    return false;
  } catch (e) {
    return false;
  }
}

module.exports = isMonoRepo;
