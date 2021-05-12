/**
 * Collecting API routes for easy reference
 */

'use strict';

const router = require('express').Router();

const machineRoutes = require('./machine.routes');
const jobRoutes = require('./job.routes');

router.use('/job', jobRoutes);
router.use('/machine', machineRoutes);

module.exports = router;
