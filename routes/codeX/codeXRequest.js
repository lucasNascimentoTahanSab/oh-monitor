/**
 * @file Módulo responsável pela elaboração de requisições à API CodeX.
 * @copyright Lucas N. T. Sab 2023 
 */
const CX_BUILDER = require('./codeXBuilder');

require('dotenv').config();

const CX_REQUEST = {
  async getRequest(req) {
    const encodedParams = new URLSearchParams();

    encodedParams.append('code', await CX_BUILDER.build(req.body.codes, req.body.config));
    encodedParams.append('language', req.body.config?.language);

    if (req.body.input) { encodedParams.append('input', req.body.input); }

    return {
      method: 'POST',
      url: process.env.CX_ENDPOINT,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.CX_TOKEN,
        'X-RapidAPI-Host': process.env.CX_HOST
      },
      data: encodedParams
    };
  }
};

module.exports = CX_REQUEST;