const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser'); 

const serverConfig = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(express.static('public'));
  app.use(cookieParser());
};

module.exports = serverConfig;
