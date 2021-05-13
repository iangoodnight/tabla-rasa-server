/**
 * API routes for Job CRUD
 */

'use strict';

const router = require('express').Router();
const { jobController } = require('../../controllers');

// CREATE
router.post('/', jobController.create);
// READ
router.get('/date', jobController.findByDateRange);
router.get('/', jobController.findAll);
router.get('/:id', jobController.findById);
// UPDATE
router.put('/:id', jobController.update);
// DELETE
router.delete('/:id', jobController.delete);

module.exports = router;
