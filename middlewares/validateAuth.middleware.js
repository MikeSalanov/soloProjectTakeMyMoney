const { body } = require('express-validator');
const Person = require('../classes/Person');

const validateAuthMiddleware = [
  body().notEmpty().withMessage('Body must be not empty'),
  body('login').notEmpty().withMessage('Login is require'),
  body('password').notEmpty().withMessage('Password is require'),
  body().custom(async ({ login, password }, { req }) => {
    const person = new Person(login);
    await person.validateAuth(password);
    req.person = person;
  }),
];

module.exports = validateAuthMiddleware;
