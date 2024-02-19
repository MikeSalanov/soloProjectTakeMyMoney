/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const releaseTokens = require('../routes/utils/releaseTokens');
const Person = require('../classes/Person');

const validateTokens = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (errAccessToken, userAccessToken) => {
    if (!errAccessToken) {
      req.user = userAccessToken;
      return next();
    }
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (errRefreshToken, userRefreshToken) => {
        if (errRefreshToken) {
          return res.redirect('/signIn');
        }
        console.log(userRefreshToken);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = releaseTokens({
          login: userRefreshToken.login,
        });

        const person = new Person(userRefreshToken.login);
        await person.toMakeInvalidRefeshToken(refreshToken);

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: 6 * 60 * 60 * 1000,
        });

        req.user = {
          login: person.login,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        };
        return next();
      },
    );
  });
};

module.exports = validateTokens;
