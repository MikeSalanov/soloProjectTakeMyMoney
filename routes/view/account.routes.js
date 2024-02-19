const React = require('react');
const ReactDOMServer = require('react-dom/server');
const router = require('express').Router();
const AccountPage = require('../../components/AccountPage/AccountPage');
const AccountCard = require('../../components/AccountPage/AccountCard');
const parseJWT = require('../utils/jwtDecode');
const validateTokens = require('../../middlewares/validateTokens.middleware');
const Person = require('../../classes/Person');

router.route('/').get(validateTokens, async (req, res) => {
  const { login } = parseJWT(req.cookies.refreshToken);
  const person = new Person(login);
  const projectsOfPerson = await person.toGetAllProjectsOfUser();
  const allProjects = await person.toGetAllProjects();
  const accountCard = React.createElement(AccountCard, { login });
  const accountPage = React.createElement(AccountPage, {
    projectsOfPerson, allProjects, accountCard,
  });
  const html = ReactDOMServer.renderToStaticMarkup(accountPage);
  res.write('<!DOCTYPE html><html><head><meta charSet="UTF-8" /><link rel="icon" type="image/x-icon" href="/images/favicon.ico" /><script defer src="/js/account.js"></script><link rel="stylesheet" href="/styles/accountPage/accountPage.style.css" /></head><body></body>');
  res.write(html);
  res.end('</body></html>');
});

module.exports = router;
