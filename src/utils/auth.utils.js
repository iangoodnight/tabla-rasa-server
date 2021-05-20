const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: false, // Just for development FIXME
    signed: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
  getToken: (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
    });
  },
  getRefreshToken: (user) => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: 30 * 24 * 60 * 60 * 1000,
    });
    return refreshToken;
  },
  verifyUser: passport.authenticate('jwt', { session: false }),
};
