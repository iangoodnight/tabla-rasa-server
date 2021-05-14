/**
 * Gatekeeper for protected API routes
 */

'use strict';

module.exports = (req, res, next) => {
  const loggedIn = req.isAuthenticated();
  res.locals.login = loggedIn;
  if (loggedIn) return next();
  res.status(401).json({ message: 'Must be authenticated' });
};
