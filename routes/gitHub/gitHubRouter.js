/**
 * @file Módulo responsável pelo intermédio de comunicações backend da aplicação com API GitHub.
 * @copyright Lucas N. T. Sab 2023 
 */
const express = require('express');
const axios = require('axios');
const GH_REQUEST = require('./gitHubRequest');

require('dotenv').config();

const router = express.Router();

/**
 * Endpoint responsável pela recuperação do conteúdo do arquivo desejado a partir da URL recebida.
 */
router.get('/*', (req, res) => {
  getFile(req.url)
    .then(response => res.send(response.data))
    .catch(error => res.send(error.response?.data));
});

/**
 * Método responsável pela obtenção do arquivo desejado por meio da URL recebida, recuperando, 
 * inicialmente, metadados do arquivo, para, em seguida, recuperar o conteúdo.
 * 
 * @param {string} url 
 * @returns {Promise}
 */
function getFile(url) {
  return new Promise((resolve, reject) =>
    axios.request(GH_REQUEST.getRequest(url))
      .then(response => resolve(axios.request(GH_REQUEST.getRequestFor(response.data?.download_url))))
      .catch(error => reject(error.response?.data))
  );
}

const GH = { router, getFile };

module.exports = GH;