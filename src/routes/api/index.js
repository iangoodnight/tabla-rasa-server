/**
 * Collecting API routes for easy reference
 */

'use strict';

const router = require('express').Router();

const authRoutes = require('./auth.routes');
const jobRoutes = require('./job.routes');
const machineRoutes = require('./machine.routes');
const userRoutes = require('./user.routes');
const loggedIn = require('../../middleware/mustBeLoggedIn');

router.use('/auth', authRoutes);
router.use('/job', jobRoutes);
router.use('/machine', machineRoutes);
router.use('/user', loggedIn, userRoutes);

module.exports = router;
