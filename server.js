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

app.use('/api/content', ST.router);
app.use('/api/code', ST_AUTH.validate, CX.router);
app.use('/api/repo', ST_AUTH.validate, GH.router);

if (process.env.NODE_ENV === 'production') {
  app.get('/', ST_AUTH.validate, (req, res) => {
    ST.getMe(req)
      .then(response => res.redirect(response.screen))
      .catch(() => res.redirect('/signin'));
  });

  app.get('/tcle', ST_AUTH.validate, (req, res, next) => {
    ST.getMe(req)
      .then(response => {
        if (response.screen !== '/' && !response.screen?.includes('tcle')) { res.redirect(response.screen); }
        else { next(); }
      })
      .catch(() => res.redirect('/signin'));
  });

  app.get('/background', ST_AUTH.validate, (req, res, next) => {
    ST.getMe(req)
      .then(response => {
        if (!response.screen !== '/' && !response.screen?.includes('tcle') && !response.screen?.includes('background')) { res.redirect(response.screen); }
        else { next(); }
      })
      .catch(() => res.redirect('/signin'));
  });

  app.get('/classroom/:uid', ST_AUTH.validate, (req, res, next) => {
    ST.getMe(req)
      .then(response => {
        if (!response.screen !== '/' && !response.screen?.includes('background') && !response.screen?.includes('classroom')) { res.redirect(response.screen); }
        else { next(); }
      })
      .catch(() => res.redirect('/signin'));
  });

  app.get('/classroom', ST_AUTH.validate, (req, res, next) => {
    ST.getMe(req)
      .then(response => {
        if (!response.screen !== '/' && !response.screen?.includes('background')) { res.redirect(response.screen); }
        else { res.redirect('/signin'); }
      })
      .catch(() => res.redirect('/signin'));
  })

  app.get('/feedback', ST_AUTH.validate, (req, res, next) => {
    ST.getMe(req)
      .then(response => {
        if (!response.screen !== '/' && !response.screen?.includes('classroom') && !response.screen?.includes('feedback')) { res.redirect(response.screen); }
        else { next(); }
      })
      .catch(() => res.redirect('/signin'));
  });

  app.use('/', express.static(path.join(__dirname, 'build')));
  app.use('/signup', express.static(path.join(__dirname, 'build')));
  app.use('/signin', express.static(path.join(__dirname, 'build')));
  app.use('/tcle', ST_AUTH.validate, express.static(path.join(__dirname, 'build')));
  app.use('/background', ST_AUTH.validate, express.static(path.join(__dirname, 'build')));
  app.use('/classroom/:uid', ST_AUTH.validate, express.static(path.join(__dirname, 'build')));
  app.use('/feedback', ST_AUTH.validate, express.static(path.join(__dirname, 'build')));
} else if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, 'public')));
}

app.listen(process.env.PORT || 3000);