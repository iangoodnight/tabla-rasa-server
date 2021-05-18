/**
 * auth controller for handling login/logout
 */

'use strict';

const { User } = require('../models');
const passport = require('passport');
const {
  COOKIE_OPTIONS,
  getRefreshToken,
  getToken,
} = require('../utils/authenticate.utils');

module.exports = {
  // Authenticate
  authenticate: (req, res, next) => {
    passport.authenticate('local', async (err, user /* info */) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: 'Invalid credential' });
      const token = getToken({ _id: user._id });
      const refreshToken = getRefreshToken({ _id: user._id });
      try {
        const loggedInUser = await User.findById(user._id);
        loggedInUser.refreshToken.push({ token: refreshToken });
        await loggedInUser.save();
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
        res.send({ success: true, token });
      } catch (err) {
        (res.status = 500), next(err);
      }
      //      req.logIn(user, (err) => {
      //        if (err) return next(err);
      //        const { _id, user: username } = user;
      //        res.json({ user: { _id, username } });
      //      });
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
