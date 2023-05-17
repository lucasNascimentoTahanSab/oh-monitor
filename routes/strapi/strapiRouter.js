/**
 * @file Módulo responsável pelo intermédio de comunicações backend da aplicação com API Strapi.
 * @copyright Lucas N. T. Sab 2023 
 */
const express = require('express');
const axios = require('axios');
const ST_REQUEST = require('./strapiRequest');
const ST_PARSER = require('./strapiParser');

require('dotenv').config();

const router = express.Router();

/**
 * Endpoint responsável pela recuperação do conteúdo armazenado no CMS Strapi por meio do Id
 * do assunto desejado.
 */
router.get('/subjects/:subjectId', (req, res) => {
  axios.request(ST_REQUEST.getSubjectRequest(req))
    .then(response => res.send(ST_PARSER.parse(response.data)))
    .catch(error => res.send(error));
});

router.get('/exercises?*', (req, res) => {
  axios.request(ST_REQUEST.getExerciseAnswerRequest(req))
    .then(response => res.send(ST_PARSER.parseCorrectAnswers(response.data)))
    .catch(error => res.send(error));
});

const ST = { router };

module.exports = ST;