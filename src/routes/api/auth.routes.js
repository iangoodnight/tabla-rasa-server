/**
 * API routes for User auth
 */

'use strict';

const router = require('express').Router();
const { authController } = require('../../controllers');

// INFO
router.get('/', authController.info);
// LOGIN
router.post('/', authController.authenticate);
// LOGOUT
router.delete('/', authController.logout);

module.exports = router;
