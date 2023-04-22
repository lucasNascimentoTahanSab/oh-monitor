const express = require('express');
const axios = require('axios');

require('dotenv').config();

const { getRequest, getRequestFor } = require('./gitHubRequest');

const gitHubRouter = express.Router();

gitHubRouter.get('/*', (req, res) => {
  getFile(req.url)
    .then(response => res.send({ data: response.data }))
    .catch(error => res.send(error));
});

function getFile(url) {
  return new Promise((resolve, reject) =>
    axios.request(getRequest(url))
      .then(response => resolve(axios.request(getRequestFor(response.data?.download_url))))
      .catch(error => reject(error))
  );
}

module.exports = {
  gitHubRouter,
  getFile
};