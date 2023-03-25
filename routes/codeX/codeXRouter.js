const express = require('express');
const axios = require('axios');

require('dotenv').config();

const { getRequest } = require('./codeXRequest');

const router = express.Router();

router.post('/submit', (req, res) => {
  axios.request(getRequest(req))
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

module.exports = router;