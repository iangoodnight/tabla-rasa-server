/**
 * auth controller for handling login/logout
 */

'use strict';

const passport = require('passport');

module.exports = {
  // Authenticate
  authenticate: (req, res, next) => {
    passport.authenticate('local', (err, user /* info */) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: 'Invalid credential' });
      req.logIn(user, (err) => {
        if (err) return next(err);
        const { _id, user: username } = user;
        res.json({ user: { _id, username } });
      });
    })(req, res, next);
  },
  // Info
  info: (req, res) => {
    if (!req.user) return res.json({ message: 'Not logged in' });
    const { _id, user } = req;
    res.json({ user: { _id, user } });
  },
  // Logout
  logout: (req, res) => {
    req.logout();
    req.session.destroy();
    res.json({
      message: 'Logged out',
    });
  },
};
