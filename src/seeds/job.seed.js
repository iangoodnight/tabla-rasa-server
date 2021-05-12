/**
 * Convenience seed for job collection
 */

'use strict';

const randomInt = require('../utils/randomInt.utils');

function randomDate(dateSeed) {
  const newDate = new Date(dateSeed);
  newDate.setDate(randomInt());
  const day = newDate.getDay();
  if (day !== 0 && day !== 6) return newDate;
  return randomDate(dateSeed);
}

module.exports = (function () {
  const dateSeed = new Date().setHours(0, 0, 0, 0);
  const jobSeed = [];
  let i = 0;
  while (i < 400) {
    const count = randomInt(500, 10_000);
    const lot = `${2021 + i}`;
    const po = `PO${lot}`;
    const priority = randomInt(0, 9);
    const scheduled = randomDate(dateSeed);
    jobSeed.push({
      count,
      lot,
      po,
      priority,
      scheduled,
    });
    i++;
  }
  return jobSeed;
})();
