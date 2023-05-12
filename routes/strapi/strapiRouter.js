/**
 * @file Módulo responsável pelo intermédio de comunicações backend da aplicação com API Strapi.
 * @copyright Lucas N. T. Sab 2023 
 */
const express = require('express');
const axios = require('axios');
const ST_REQUEST = require('./strapiRequest');

require('dotenv').config();

const router = express.Router();

/**
 * Endpoint responsável pela recuperação do conteúdo armazenado no CMS Strapi por meio do Id
 * do assunto desejado.
 */
router.get('/subjects/:subjectId', (req, res) => {
  axios.request(ST_REQUEST.getSubjectRequest(req))
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

const ST = { router };

module.exports = ST;