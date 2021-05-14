/**
 * API routes for User CRUD
 */

'use strict';

const router = require('express').Router();
const { userController } = require('../../controllers');

// CREATE
router.post('/', userController.create);
// READ
router.get('/:id', userController.findById);
router.get('/', userController.findAll);
// UPDATE
router.put('/:id', userController.update);
// DELETE
router.delete('/:id', userController.delete);

module.exports = router;
