require('@babel/register');
const router = require('express').Router();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Layout = require('../../components/Layout');
const Header = require('../../components/Header');
const MainBody = require('../../components/MainPage/MainBody');
const ButtonsOfAuthorization = require('../../components/ButtonsOfAuthorization');
const ButtonOfAccount = require('../../components/ButtonOfAccount');

router.route('/').get((req, res) => {
  let buttonInHeader;
  if (req.cookies.accessToken) {
    buttonInHeader = React.createElement(ButtonOfAccount);
  } else {
    buttonInHeader = React.createElement(ButtonsOfAuthorization);
  }
  const header = React.createElement(Header, {}, buttonInHeader);
  const mainBody = React.createElement(MainBody, {}, header);
  const layout = React.createElement(Layout, {}, mainBody);
  const html = ReactDOMServer.renderToStaticMarkup(layout);
  res.write('<!DOCTYPE html>');
  res.end(html);
});

module.exports = router;
