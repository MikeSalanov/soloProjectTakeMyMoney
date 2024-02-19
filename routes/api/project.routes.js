const router = require('express').Router();
const Person = require('../../classes/Person');
const parseJWT = require('../utils/jwtDecode');
const validateTokens = require('../../middlewares/validateTokens.middleware');

router.route('/').patch(
  validateTokens,
  async (req, res) => {
    try {
      const { login } = parseJWT(req.cookies.refreshToken);
      console.log('login', login);
      const person = new Person(login);
      await person.changeNameOfProject(req.body.oldName, req.body.newName);
      return res.status(200).json({ message: 'Successfully changed' });
    } catch (err) {
      return res.status(500).json({ message: 'Server side error' });
    }
  },
).delete(
  validateTokens,
  async (req, res) => {
    try {
      const { login } = parseJWT(req.cookies.refreshToken);
      const person = new Person(login);
      await person.removeProject(req.body.nameOfProject);
      return res.status(200).json({ message: 'Successfully removed' });
    } catch (err) {
      return res.status(500).json({ message: 'Server side error' });
    }
  },
).post(
  validateTokens,
  async (req, res) => {
    try {
      const { login } = parseJWT(req.cookies.refreshToken);
      const person = new Person(login);
      await person.createProject({ name: req.body.name, description: req.body.description });
      return res.status(200).json({ message: 'Successfully created' });
    } catch (err) {
      return res.status(500).json({ message: 'Server side error' });
    }
  },
);

module.exports = router;
