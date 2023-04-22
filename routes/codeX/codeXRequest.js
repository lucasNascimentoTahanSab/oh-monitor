require('dotenv').config();
const { build } = require('./codeXBuilder');

module.exports = {
  async getRequest(req) {
    const encodedParams = new URLSearchParams();

    encodedParams.append('code', await build(req.body.files, req.body.config));
    encodedParams.append('language', req.body.config?.language);

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