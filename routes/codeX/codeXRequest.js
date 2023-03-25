require('dotenv').config();

module.exports = {
  getRequest: req => {
    const encodedParams = new URLSearchParams();

    encodedParams.append('code', req.body.code);
    encodedParams.append('language', req.body.language);

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