const express = require('express');
const axios = require('axios');

require('dotenv').config();

const { getRequest, getRequestFor } = require('./gitHubRequest');

const router = express.Router();

router.get('/:language/snippets|codes/:file.:extension', (req, res) => {
  axios.request(getRequest(req))
    .then(response => axios.request(getRequestFor(response.data?.download_url)))
    .then(response => res.send({ data: response.data }))
    .catch(error => res.send(error));
});

module.exports = router;