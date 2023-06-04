/**
 * @file Módulo responsável por roteamento no servidor, redirecionando usuário para
 * a página atual e demais páginas da aplicação.
 * @copyright Lucas N. T. Sab 2023
 */
const express = require('express');
const ST = require('../strapi/strapiRouter');
const ST_AUTH = require('../strapi/strapiAuth');

require('dotenv').config();

/**
 * Constante responsável por indicar páginas a partir das quais o usuário poderia
 * acessar a página atual (Ex.: A página /background pode ser acessada a partir de
 * /tcle e /background, além de /).
 */
const ALLOWED = {
  '/': [],
  '/tcle': ['tcle'],
  '/background': ['tcle', 'background'],
  '/classroom/:uid': ['background', 'classroom'],
  '/classroom': [],
  '/feedback': ['classroom', 'feedback'],
};

/**
 * Constante responsável por redirecionar o usuário à página atual de acordo com
 * estado do usuário e estados permitidos.
 */
const REDIRECT = {
  '/': (user, res) => { res.redirect(user.screen); },
  '/tcle': (user, res, next) => {
    if (user.screen === '/' || isAllowed(user.screen, '/tcle')) { next(); }
    else { res.redirect(user.screen); }
  },
  '/background': (user, res, next) => {
    if (user.screen === '/' || isAllowed(user.screen, '/background')) { next(); }
    else { res.redirect(user.screen); }
  },
  '/classroom/:uid': (user, res, next) => {
    if (user.screen === '/' || isAllowed(user.screen, '/classroom/:uid')) { next(); }
    else { res.redirect(user.screen); }
  },
  '/classroom': (user, res) => { res.redirect(user.screen); },
  '/feedback': (user, res, next) => {
    if (user.screen === '/' || isAllowed(user.screen, '/feedback')) { next(); }
    else { res.redirect(user.screen); }
  }
};

/**
 * Método responsável por verificar se acesso ao caminho recebido está habilitado
 * a partir da tela em que se encontra o usuário e estados permitidos.
 * 
 * @param {string} screen 
 * @param {string} path 
 * @returns {boolean}
 */
function isAllowed(screen, path) {
  return ALLOWED[path].reduce((result, item) => result || screen?.includes(item), false);
}

const router = express.Router();

/**
 * Endpoint responsável por encaminhar o usuário à tela de entrada ou tela atual
 * quando já autenticado.
 */
router.get('/', ST_AUTH.validate, (req, res) => {
  ST.getMe(req)
    .then(user => REDIRECT['/'](user, res))
    .catch(() => res.redirect('/signin'));
});

/**
 * Endpoint responsável por encaminhar o usuário à tela /tcle, quando permitido, ou 
 * à tela atual, caso contrário.
 */
router.get('/tcle', ST_AUTH.validate, (req, res, next) => {
  ST.getMe(req)
    .then(user => REDIRECT['/tcle'](user, res, next))
    .catch(() => res.redirect('/signin'));
});

/**
 * Endpoint responsável por encaminhar o usuário à tela /background, quando permitido, 
 * ou à tela atual, caso contrário.
 */
router.get('/background', ST_AUTH.validate, (req, res, next) => {
  ST.getMe(req)
    .then(user => REDIRECT['/background'](user, res, next))
    .catch(() => res.redirect('/signin'));
});

/**
 * Endpoint responsável por encaminhar o usuário à tela /classroom/:uid, quando permitido, 
 * ou à tela atual, caso contrário.
 */
router.get('/classroom/:uid', ST_AUTH.validate, (req, res, next) => {
  ST.getMe(req)
    .then(user => REDIRECT['/classroom/:uid'](user, res, next))
    .catch(() => res.redirect('/signin'));
});

/**
 * Endpoint responsável por encaminhar o usuário à tela /classroom, quando permitido, 
 * ou à tela atual, caso contrário.
 */
router.get('/classroom', ST_AUTH.validate, (req, res) => {
  ST.getMe(req)
    .then(user => REDIRECT['/classroom'](user, res))
    .catch(() => res.redirect('/signin'));
})

/**
 * Endpoint responsável por encaminhar o usuário à tela /feedback, quando permitido, 
 * ou à tela atual, caso contrário.
 */
router.get('/feedback', ST_AUTH.validate, (req, res, next) => {
  ST.getMe(req)
    .then(user => REDIRECT['/feedback'](user, res, next))
    .catch(() => res.redirect('/signin'));
});

const SERVER = { router };

module.exports = SERVER;