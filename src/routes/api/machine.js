/**
 * API routes for Machine CRUD
 */

'use strict';

const router = require('express').Router();
const ah = require('express-async-handler');
const { machineController } = require('../../controllers');

// CREATE
router.post('/', ah(machineController.create));
// READ
router.get('/:id', ah(machineController.findById));
router.get('/', ah(machineController.findAll));
// UPDATE
router.put('/:id', ah(machineController.update));

module.exports = router;
