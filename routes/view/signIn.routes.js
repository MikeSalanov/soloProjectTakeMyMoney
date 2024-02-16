const React = require('react');
const ReactDOMServer = require('react-dom/server');
const router = require('express').Router();
const SignInForm = require('../../components/SignInPage/SignInForm');

router.route('/').get((req, res) => {
  if (req.headers.authorization) return res.redirect('/account');
  const signInForm = React.createElement(SignInForm);
  const html = ReactDOMServer.renderToStaticMarkup(signInForm);
  res.write('<!DOCTYPE html><html><head><link rel="icon" type="image/x-icon" href="/images/favicon.ico" />');
  res.write('<link rel="stylesheet" href="/styles/signInPage/signIn.style.css"><script defer src="/js/signInForm.js"></script></head><body>');
  res.write(html);
  return res.end('</body></html>');
});

module.exports = router;
