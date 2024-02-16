/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const releaseTokens = require('../routes/utils/releaseTokens');
// const Person = require('../classes/Person');

const validateTokens = (req, res, next) => {
  const { authorization: authHeader } = req.headers;
  if (!authHeader) return res.status(401).json({ message: 'Пользователь не авторизован' });
  const accessToken = authHeader.split(' ')[1];
  const { refreshToken } = req.cookies;
  console.log('refreshToken in validateTokens', refreshToken);
  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (!err) {
      console.log('user in verify access token', user);
      req.user = user;
      return next();
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async () => {
      if (err) {
        return res.redirect('/signIn');
      }
      console.log('user in verify refresh token', user);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = releaseTokens();
      // Пометить старый refreshToken как невалидный в базе данных
      // Здесь должен быть ваш код для пометки refreshToken в БД
      // Установка нового refreshToken в httpOnly куки
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 6 * 60 * 60 * 1000,
      });
      // Установка нового accessToken в req.user для использования в последующих middleware
      req.user = newAccessToken;
      return next();
    });
  });
};

module.exports = validateTokens;
