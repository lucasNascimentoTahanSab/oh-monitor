const express = require('express');
const axios = require('axios');

require('dotenv').config();

const { getSubjectRequest } = require('./strapiRequest');

const router = express.Router();

router.get('/subjects/:subjectId', (req, res) => {
  axios.request(getSubjectRequest(req))
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
});

module.exports = router; 