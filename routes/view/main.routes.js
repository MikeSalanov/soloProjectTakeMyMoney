require('@babel/register');
const router = require('express').Router();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Layout = require('../../components/Layout');
const Header = require('../../components/Header');
const MainBody = require('../../components/MainPage/MainBody');

router.route('/').get((req, res) => {
  const header = React.createElement(Header);
  const mainBody = React.createElement(MainBody, {}, header);
  const layout = React.createElement(Layout, {}, mainBody);
  const html = ReactDOMServer.renderToStaticMarkup(layout);
  res.write('<!DOCTYPE html>');
  res.end(html);
});

module.exports = router;
