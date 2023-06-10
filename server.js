/**
 * @file Módulo responsável pelo intermédio de comunicações backend da aplicação com serviços externos.
 * @copyright Lucas N. T. Sab 2023 
 */
const express = require('express');
const session = require('express-session');
const path = require('path');
const CX = require('./routes/codeX/codeXRouter.js');
const ST = require('./routes/strapi/strapiRouter.js');
const GH = require('./routes/gitHub/gitHubRouter.js');
const ST_AUTH = require('./routes/strapi/strapiAuth.js');
const SERVER = require('./routes/server/serverRouter.js');

require('dotenv').config();

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: parseInt(process.env.SESSION_MAX_AGE)
  }
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/', SERVER.router);
app.use('/api/content', ST.router);
app.use('/api/code', ST_AUTH.validate, CX.router);
app.use('/api/repo', ST_AUTH.validate, GH.router);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'build')));
  app.use('/signup', express.static(path.join(__dirname, 'build')));
  app.use('/signin', express.static(path.join(__dirname, 'build')));
  app.use('/tcle', express.static(path.join(__dirname, 'build')));
  app.use('/background', express.static(path.join(__dirname, 'build')));
  app.use('/classroom/:uid', express.static(path.join(__dirname, 'build')));
  app.use('/feedback', express.static(path.join(__dirname, 'build')));
  app.use('/thanks', express.static(path.join(__dirname, 'build')));
} else if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, 'public')));
}

app.listen(process.env.PORT || 3000);