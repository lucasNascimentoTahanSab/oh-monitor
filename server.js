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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/code', CX.router);
app.use('/api/content', ST.router);
app.use('/api/repo', GH.router);

app.get('/', (req, res) => res.redirect('/signin'));

if (process.env.NODE_ENV === 'production') {
  app.use('/*', express.static(path.resolve(__dirname, './build')));
  app.use('/*', (req, res) => res.sendFile(path.resolve(__dirname, './build/index.html')));
} else if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, 'public')));
}

app.listen(process.env.PORT || 3000);