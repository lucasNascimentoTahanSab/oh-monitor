/**
 * @file Módulo responsável pelo intermédio de comunicações backend da aplicação com API Strapi.
 * @copyright Lucas N. T. Sab 2023 
 */
const express = require('express');
const axios = require('axios');
const ST_REQUEST = require('./strapiRequest.js');
const ST_PARSER = require('./strapiParser.js');
const ST_AUTH = require('./strapiAuth.js');

require('dotenv').config();

const router = express.Router();

/**
 * Endpoint responsável pela recuperação do usuário atual após entrada na plataforma. Os dados
 * obtidos são utilizados para verificação da página atual em que se encontra o usuário e outras
 * configurações.
 */
router.get('/me', ST_AUTH.validate, (req, res) => {
  getMe(req)
    .then(response => res.send(response))
    .catch(error => res.send(error));
});

function getMe(req) {
  return new Promise((resolve, reject) => {
    axios.request(ST_REQUEST.getMe(req))
      .then(response => resolve(response.data))
      .catch(error => reject(error.response?.data));
  });
}

/**
 * Endpoint responsável pela atualização do usuário no Strapi.
 */
router.put('/me/update', ST_AUTH.validate, (req, res) => {
  axios.request(ST_REQUEST.updateMe(req))
    .then(response => res.send(response.data))
    .catch(error => res.send(error.response?.data));
});

/**
 * Endpoint responsável pela recuperação do conteúdo armazenado no CMS Strapi por meio do UID
 * do assunto desejado.
 */
router.get('/subjects/:subjectId', ST_AUTH.validate, (req, res) => {
  axios.request(ST_REQUEST.getSubjectRequest(req))
    .then(response => res.send(ST_PARSER.parse(response.data)))
    .catch(error => res.send(error.response?.data));
});

/**
 * Endpoint responsável pela recuperação dos exercícios a partir do UID recebido e resposta
 * dada pelo usuário, retornando verdadeiro quando correta e falso do contrário.
 */
router.post('/exercises/:exerciseId', ST_AUTH.validate, (req, res) => {
  axios.request(ST_REQUEST.getExerciseAnswerRequest(req))
    .then(response => res.send(ST_PARSER.parseCorrectAnswers(req.params.exerciseId, req.body.answer, response.data)))
    .catch(error => res.send(error.response?.data));
});

/**
 * Endpoint responsável pelo cadastro de um novo usuário na plataforma. Após o cadastro, o
 * token de autorização do usuário é registrado em sessão.
 */
router.post('/signUp', (req, res) => {
  axios.post(`${process.env.ST_ENDPOINT}/auth/local/register`, { ...req.body, password: process.env.ST_PASS })
    .then(response => subscribeUser(req, res, response))
    .catch(error => res.send(error.response?.data));
});

/**
 * Endpoint responsável pela entrada de um usuário já existente na plataforma. Após a entrada, 
 * o token de autorização do usuário é registrado em sessão.
 */
router.post('/signIn', (req, res) => {
  axios.post(`${process.env.ST_ENDPOINT}/auth/local`, { ...req.body, password: process.env.ST_PASS })
    .then(response => subscribeUser(req, res, response))
    .catch(error => res.send(error.response?.data));
});

function subscribeUser(req, res, response) {
  req.session.token = response.data?.jwt;

  res.send(response.data?.user);
}

const ST = { router, getMe };

module.exports = ST;