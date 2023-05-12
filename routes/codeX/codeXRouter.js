/**
 * @file Módulo responsável pelo intermédio de comunicações backend da aplicação com API CodeX.
 * @copyright Lucas N. T. Sab 2023 
 */
const express = require('express');
const axios = require('axios');
const CX_REQUEST = require('./codeXRequest');

require('dotenv').config();

const router = express.Router();

/**
 * Enpoint responsável pela submissão de códigos para compilação/interpretação e obtenção do
 * resultado retornado.
 */
router.post('/submit', async (req, res) => {
  axios.request(await CX_REQUEST.getRequest(req))
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

const CX = { router };

module.exports = CX;