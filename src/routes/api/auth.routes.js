/**
 * API routes for User auth
 */

'use strict';

const router = require('express').Router();
const { authController } = require('../../controllers');
const { verifyUser } = require('../../utils/auth.utils');

// INFO
router.get('/', verifyUser, (req, res) => {
  res.send(req.user);
});
// LOGIN
router.post('/', authController.authenticate);
// REFRESH
router.post('/refresh', authController.refresh);
// LOGOUT
router.delete('/', verifyUser, authController.logout);

module.exports = router;
