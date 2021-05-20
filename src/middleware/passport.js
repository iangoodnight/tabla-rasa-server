/**
 * Configuring passport middleware
 */

'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { User } = require('../models');

// Export a function that takes an express app and applies middleware
module.exports = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  // setup deserialize to make the user available on the req object
  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findById(userId);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ user: username }).select('+password');
        if (!user) return done(null, false, { message: 'Username not found' });
        const isValid = await user.validatePassword;
        if (!isValid) return done(null, false, { message: 'Bad password' });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ _id: jwt_payload._id }).select(
          '+token'
        );
        if (user) return done(null, user);
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );

  app.use(passport.initialize());
};
