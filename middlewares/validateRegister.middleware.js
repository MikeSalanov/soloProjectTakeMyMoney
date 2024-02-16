const { body } = require('express-validator');
const Person = require('../classes/Person');

const validateRegisterMiddleware = [
  body().notEmpty().withMessage('Body must be not empty'),
  body('login').notEmpty().withMessage('Login is require'),
  body('password').notEmpty().withMessage('Password is require'),
  body('confirmPassword').notEmpty().withMessage('Password\'s confirm is require'),
  body('login').custom(async (login, { req }) => {
    const person = new Person(login);
    const resultOfCheckExist = await person.validateRegister();
    req.person = person;
    return resultOfCheckExist;
  }),
  body().custom(async ({ password, confirmPassword }) => {
    if (password !== confirmPassword) throw new Error('Password doesn\'t match with confirm_password field');
    return true;
  }),
];

module.exports = validateRegisterMiddleware;
