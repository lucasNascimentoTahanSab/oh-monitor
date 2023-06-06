/**
 * @file Módulo responsável pelo intermédio de comunicações backend da aplicação com serviços externos.
 * @copyright Lucas N. T. Sab 2023 
 */
const express = require('express');
const session = require('express-session');
const path = require('path');
const CX = require('./routes/codeX/codeXRouter');
const ST = require('./routes/strapi/strapiRouter');
const GH = require('./routes/gitHub/gitHubRouter');
const ST_AUTH = require('./routes/strapi/strapiAuth');
const SERVER = require('./routes/server/serverRouter');

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
  app.use('/tcle', ST_AUTH.validate, express.static(path.join(__dirname, 'build')));
  app.use('/background', ST_AUTH.validate, express.static(path.join(__dirname, 'build')));
  app.use('/classroom/:uid', ST_AUTH.validate, express.static(path.join(__dirname, 'build')));
  app.use('/feedback', ST_AUTH.validate, express.static(path.join(__dirname, 'build')));
  app.use('/thanks', ST_AUTH.validate, express.static(path.join(__dirname, 'build')));
} else if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, 'public')));
}

app.listen(process.env.PORT || 3000);