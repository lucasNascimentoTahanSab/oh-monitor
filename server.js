/**
 * @file Módulo responsável pelo intermédio de comunicações backend da aplicação com serviços externos.
 * @copyright Lucas N. T. Sab 2023 
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const CX = require('./routes/codeX/codeXRouter');
const ST = require('./routes/strapi/strapiRouter');
const GH = require('./routes/gitHub/gitHubRouter');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'build')))
  app.get('*', (req, res) => res.send(path.resolve(__dirname, 'build', 'index.html')))
}

app.use('/api/code', CX.router);
app.use('/api/content', ST.router);
app.use('/api/repo', GH.router);

app.listen(process.env.PORT);