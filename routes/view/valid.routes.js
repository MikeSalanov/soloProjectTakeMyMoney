// const React = require('react');
// const ReactDOMServer = require('react-dom/server');
const router = require('express').Router();
const validateTokens = require('../../middlewares/validateTokens.middleware');

router.route('/').get(validateTokens, (req, res) => res.html(`<!DOCTYPE html><html><head><link rel="icon" type="image/x-icon" href="/images/favicon.ico" /></head><body>Hello, ${req.user.login}</body></html>`));

module.exports = router;
