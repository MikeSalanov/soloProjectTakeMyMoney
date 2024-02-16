const registerRouter = require('express').Router();
const { validationResult } = require('express-validator');
const validateRegisterMiddleware = require('../../middlewares/validateRegister.middleware');
const hashingPassword = require('../utils/hashingPassword');

registerRouter.route('/').post(
  validateRegisterMiddleware,
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      switch (validationErrors.errors[0].msg) {
        case 'User already exists':
          return res.status(409).json({ message: validationErrors.errors[0].msg });
        case 'Password doesn\'t match with confirm_password field':
          return res.status(400).json({ message: validationErrors.errors[0].msg });
        default:
          return res.status(400).json({ message: 'Invalid request' });
      }
    }
    const hashedPassword = await hashingPassword(req.body.password);
    await req.person.toRegister(hashedPassword);
    return res.status(201).json({ message: 'Successfully created user' });
  },
);

module.exports = registerRouter;
