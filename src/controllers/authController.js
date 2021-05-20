/**
 * auth controller for handling login/logout
 */

'use strict';

const { User } = require('../models');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  COOKIE_OPTIONS,
  getRefreshToken,
  getToken,
} = require('../utils/auth.utils');

module.exports = {
  // Authenticate
  authenticate: (req, res, next) => {
    passport.authenticate('local', async (err, user) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: 'Invalid credential' });
      const token = getToken({ _id: user._id });
      const refreshToken = getRefreshToken({ _id: user._id });
      try {
        const loggedInUser = await User.findById(user._id);
        loggedInUser.refresh.push({ token: refreshToken });
        await loggedInUser.save();
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
        res.send({ success: true, token });
      } catch (err) {
        (res.status = 500), next(err);
      }
    })(req, res, next);
  },
  // Logout
  logout: async (req, res) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    const user = await User.findById(req.user._id).select('+refresh.token');
    const tokenIndex = user.refresh.findIndex((refresh) => {
      return refresh.token === refreshToken;
    });
    if (tokenIndex === -1) return res.status(204).send();
    user.refresh.id(user.refresh[tokenIndex]._id).remove();

    try {
      await user.save();
      res.clearCookie('refreshToken', COOKIE_OPTIONS);
      res.send({ success: true });
    } catch (err) {
      res.statusCode = 500;
      res.send(err);
    }
  },
  // Refresh
  refresh: async (req, res, next) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    const unauthorized = (res) => res.status(401).send('Unauthorized\n');
    if (!refreshToken) return unauthorized(res);
    try {
      const {
        env: { REFRESH_TOKEN_SECRET: SECRET },
      } = process;
      const payload = jwt.verify(refreshToken, SECRET);
      const { _id: userId } = payload;
      const query = { _id: userId };
      const select = '+refresh.token';
      const user = await User.findOne(query).select(select);
      if (!user) return unauthorized(res);
      const { refresh: storedTokens } = user;
      const tokenIndex = storedTokens.findIndex(
        (stored) => stored.token === refreshToken
      );
      if (tokenIndex === -1) return unauthorized(res);
      const token = getToken({ _id: userId });
      const newRefreshToken = getRefreshToken({ _id: userId });
      storedTokens[tokenIndex] = { token: newRefreshToken };
      await user.save();
      res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);
      res.send({ success: true, token });
    } catch (err) {
      res.statusCode = 500;
      next(err);
    }
  },
};
