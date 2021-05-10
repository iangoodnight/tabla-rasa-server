/**
 * Collecting API routes for easy reference
 */

'use strict';

const router = require('express').Router();

const machineRoutes = require('./machine');

router.use('/machine', machineRoutes);

module.exports = router;
