const { validationResult } = require('express-validator');
const router = require('express').Router();
const releaseTokens = require('../utils/releaseTokens');
const validateAuthMiddleware = require('../../middlewares/validateAuth.middleware');

router.route('/').post(
  validateAuthMiddleware,
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ message: validationErrors.errors[0].msg });
    }
    const { accessToken, refreshToken } = releaseTokens({ login: req.person.login });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      path: '*',
      maxAge: 6 * 60 * 60 * 1000,
    });
    await req.person.addRefreshTokenToUser(refreshToken);
    return res.status(200)
      .json({ accessToken });
  },
);

module.exports = router;
