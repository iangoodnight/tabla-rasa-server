/**
 * Configuring passport middleware
 */

'use strict';

const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

// Export a function that takes an express app and applies middleware
module.exports = (app) => {
  // setup session for persistent login
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl:
          process.env.NODE_ENV === 'production'
            ? process.env.MONGO_DB_URI
            : process.env.DEV_DB_URI,
      }),
      cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
      },
      /* requires https */
      // secure: true,
    })
  );

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

  app.use(passport.initialize());
  // must come after initialize
  app.use(passport.session());
};
