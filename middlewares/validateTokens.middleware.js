/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const releaseTokens = require('../routes/utils/releaseTokens');
const Person = require('../classes/Person');

const validateTokens = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (errAccessToken, user) => {
    if (!errAccessToken) {
      console.log('user in verify access token', user);
      req.user = user;
      return next();
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (errRefreshToken, { login }) => {
      if (errRefreshToken) {
        return res.redirect('/signIn');
      }
      console.log('user in verify refresh token', user);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = releaseTokens();

      const person = new Person(login);
      await person.toMakeInvalidRefeshToken(refreshToken);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 6 * 60 * 60 * 1000,
      });

      req.user = {
        ...person,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
      return next();
    });
  });
};

module.exports = validateTokens;
