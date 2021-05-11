/**
 * API routes for Machine CRUD
 */

'use strict';

const router = require('express').Router();
const { machineController } = require('../../controllers');

// CREATE
router.post('/', machineController.create);
// READ
router.get('/:id', machineController.findById);
router.get('/', machineController.findAll);
// UPDATE
router.put('/:id', machineController.update);
// DELETE
router.delete('/:id', machineController.delete);

module.exports = router;
